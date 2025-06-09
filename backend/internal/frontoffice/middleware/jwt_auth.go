package frontOfficeMiddleware

import (
	"context"
	"github.com/gin-gonic/gin"
	"strings"
	"godocker/internal/utils/token"
)

// JWTAuthMiddleware is a middleware that checks for a valid JWT token in the request header.
func JWTAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(401, gin.H{"error": "Authorization header is required"})
			return
		}

		// Split the header to get the token
		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenString == authHeader { // If it didn't start with "Bearer "
			c.AbortWithStatusJSON(401, gin.H{"error": "Invalid authorization format"})
			return
		}

		// Validate the token
		claims, err := token.ValidateJWTToken(tokenString)
		if err != nil {
			c.AbortWithStatusJSON(401, gin.H{"error": "Invalid or expired token"})
			return
		}

		// Store claims in context for later use
		ctx := context.WithValue(c.Request.Context(), "userClaims", claims)
		c.Request = c.Request.WithContext(ctx)

		c.Next()
	}
}