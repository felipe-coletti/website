package main

import (
	"log"
	"os"
	"time"
	"website-backend/config"
	"website-backend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	config.StartDB()

	if err := godotenv.Load(); err != nil {
		log.Println("Aviso: .env não encontrado")
	}

	clientURL := os.Getenv("CLIENT_URL")
	if clientURL == "" {
		clientURL = "http://localhost:5173"
	}

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{clientURL},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	routes.SetupRoutes(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	if port[0] != ':' {
		port = ":" + port
	}

	log.Printf("Servidor rodando em http://localhost%s", port)
	log.Printf("CORS habilitado para: %s", clientURL)

	if err := r.Run(port); err != nil {
		log.Fatalf("Erro ao iniciar servidor: %v", err)
	}
}
