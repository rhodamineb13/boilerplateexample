package middleware

import (
	"backend/internal/utils/token"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		tok, err := c.Cookie("auth_token")
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"authenticated": false})
			return
		}

		claims, err := token.ValidateJWTToken(tok)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"authenticated": false})
			return
		}

		uid := claims.EmployeeId

		c.Set("employee_id", uid)
		c.Next()
	}
}
