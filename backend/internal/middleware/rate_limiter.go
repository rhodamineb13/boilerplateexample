package middleware

import (
	"godocker/internal/utils/ratelimiter"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RateLimiter(rl *ratelimiter.IPRateLimiter) gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.RemoteIP()
		if ip == "" {
		}

		ip = c.ClientIP()

		client := rl.GetClientIP(ip)
		if !client.Allow() {
			c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{
				"error": "Too many requests. Please try again later.",
			})
			return
		}

		c.Next()

	}
}
