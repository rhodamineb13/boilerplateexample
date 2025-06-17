package token

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// TokenService defines the interface for token operations.
type JWTClaims struct {
	Username string
	*jwt.RegisteredClaims
}

func NewJWTToken(username string) *JWTClaims {
	claims := &jwt.RegisteredClaims{
		Issuer: "godocker",
		ExpiresAt: &jwt.NumericDate{
			Time: time.Now().Add(24 * time.Hour), // Token valid for 24 hours
		},
	}
	return &JWTClaims{
		Username:         username,
		RegisteredClaims: claims,
	}
}

func GenerateJWTToken(username string) (string, error) {
	claims := NewJWTToken(username)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	secretKey := []byte("your-secret-key")
	signedToken, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}
	fmt.Println("signedToken: ", signedToken)
	return signedToken, nil
}

func ValidateJWTToken(tokenString string) (*JWTClaims, error) {
	secretKey := []byte("your-secret-key")
	token, err := jwt.ParseWithClaims(tokenString, &JWTClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return secretKey, nil
	})
	if err != nil || !token.Valid {
		return nil, jwt.ErrSignatureInvalid
	}

	claims, ok := token.Claims.(*JWTClaims)
	if !ok {
		return nil, jwt.ErrTokenMalformed
	}
	return claims, nil
}
