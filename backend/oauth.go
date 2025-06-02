package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"

	"github.com/gin-gonic/gin"
)

type Web struct {
	ClientID     string `json:"client_id"`
	ClientSecret string `json:"client_secret"`
	ProjectID    string `json:"project_id"`
	AuthURI      string `json:"auth_uri"`
	TokenURI     string `json:"token_uri"`
	AuthProvider string `json:"auth_provider_x509_cert_url"`
}

type OAuthConfig struct {
	Web Web `json:"web"`
}

var (
	googleOAuthConfig *oauth2.Config
	randomState       string = "state"
)

func getconfigJSON() *OAuthConfig {
	var config *OAuthConfig

	data, err := os.ReadFile("oauth2.json")
	if err != nil {
		panic(err)
	}

	json.Unmarshal(data, &config)

	return config
}

func GetOAuth2Config() {
	conf := getconfigJSON()
	fmt.Println(conf)

	googleOAuthConfig = &oauth2.Config{
		RedirectURL:  "http://localhost:70/callback",
		ClientID:     conf.Web.ClientID,
		ClientSecret: conf.Web.ClientSecret,
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
		Endpoint:     google.Endpoint,
	}
}

func Login(c *gin.Context) {
	GetOAuth2Config()

	url := googleOAuthConfig.AuthCodeURL(randomState)
	c.Redirect(http.StatusTemporaryRedirect, url)
}

func OAuthCallbackHandler(c *gin.Context) {
	GetOAuth2Config()
	state := c.Query("state")
	if state == "" {
		c.String(http.StatusTemporaryRedirect, "invalid state")
		return
	}

	_, err := googleOAuthConfig.Exchange(c, c.Query("code"))

	if err != nil {
		c.String(http.StatusTemporaryRedirect, "invalid token")
		return
	}

	c.String(http.StatusOK, "success")
}
