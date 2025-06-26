package token

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// TokenService defines the interface for token operations.
type JWTClaims struct {
	EmployeeId string
	*jwt.RegisteredClaims
}

func NewJWTToken(EmployeeId string) *JWTClaims {
	claims := &jwt.RegisteredClaims{
		Issuer: "backend",
		ExpiresAt: &jwt.NumericDate{
			Time: time.Now().Add(24 * time.Hour), // Token valid for 24 hours
		},
	}
	return &JWTClaims{
		EmployeeId:       EmployeeId,
		RegisteredClaims: claims,
	}
}

func GenerateJWTToken(EmployeeId string) (string, error) {
	claims := NewJWTToken(EmployeeId)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	secretKey := []byte("your-secret-key")
	signedToken, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}
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
