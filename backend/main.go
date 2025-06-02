package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.ForwardedByClientIP = true
	r.SetTrustedProxies([]string{"nginx"})
	r.GET("/hello", func(c *gin.Context) {
		c.String(200, "<h1>Hello, World!</h1>")
	})
	r.GET("/login", Login)
	r.GET("/callback", OAuthCallbackHandler)
	r.Run(":8080") // listen and serve on
}
