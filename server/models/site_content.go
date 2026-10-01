package models

import "time"

// SiteContent guarda textos fixos do site (ex: o texto de boas-vindas da home),
// identificados por Key. Value é HTML.
type SiteContent struct {
	Key       string    `json:"key" gorm:"primaryKey"`
	Value     string    `json:"value" gorm:"not null"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func (SiteContent) TableName() string {
	return "site_content"
}
