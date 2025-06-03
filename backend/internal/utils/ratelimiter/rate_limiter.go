package ratelimiter

import (
	"sync"
	"time"

	"golang.org/x/time/rate"
)

type Limiter struct {
	*rate.Limiter
	lastSeen time.Time
}

type IPRateLimiter struct {
	sync.RWMutex
	client   map[string]*Limiter
	limit    rate.Limit
	burst    uint
	ttl      time.Duration
	stopChan chan struct{}
}

func NewRateLimiter(l rate.Limit, b uint, ttl time.Duration) *IPRateLimiter {
	newLimiter := &IPRateLimiter{
		client:   make(map[string]*Limiter),
		limit:    l,
		burst:    b,
		ttl:      ttl,
		stopChan: make(chan struct{}),
	}

	go newLimiter.cleanup()
	
	return newLimiter
}

func (rl *IPRateLimiter) GetClientIP(ip string) *Limiter {
	rl.Lock()
	defer rl.Unlock()
	client, exist := rl.client[ip]
	if exist {
		return client
	}

	newClient := &Limiter{
		Limiter: rate.NewLimiter(rl.limit, int(rl.burst)),
		lastSeen: time.Now(),
	}

	rl.client[ip] = newClient

	return newClient
}

func (rl *IPRateLimiter) cleanup() {
	ticker := time.NewTicker(rl.ttl / 2)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			rl.Lock()
			for ip := range rl.client {
				if time.Since(rl.client[ip].lastSeen) > rl.ttl {
					delete(rl.client, ip)
				}
			}
			rl.Unlock()
		case <-rl.stopChan:
			return
		}
	}
}


