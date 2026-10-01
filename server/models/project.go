package models

import "time"

// Slug é um ID curto e aleatório (ex: "k3x9a2") gerado pelo banco; ver db/schema.sql.
type Work struct {
	ID          uint       `json:"id" gorm:"primaryKey"`
	Title       string     `json:"title" gorm:"not null"`
	Slug        string     `json:"slug" gorm:"unique;not null;default:generate_work_slug()"`
	Content     string     `json:"content"`
	IsPublished bool       `json:"isPublished"`
	CreatedAt   time.Time  `json:"createdAt"`
	PublishedAt *time.Time `json:"publishedAt"`
	Tags        []Tag      `json:"tags" gorm:"many2many:works_tags;"`
}
