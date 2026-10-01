-- Migração para um banco criado antes da tabela site_content existir.
--   psql -d website -f server/db/migrate-site-content.sql
-- Pode rodar mais de uma vez: não recria a tabela nem sobrescreve um texto já salvo.

BEGIN;

CREATE TABLE IF NOT EXISTS site_content (
    key        TEXT PRIMARY KEY CHECK (key ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
    value      TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO site_content (key, value) VALUES
    ('welcome', '<p>I''m Felipe Coletti, a developer who builds things for the web. This is where I share my work and write about what I learn.</p>')
ON CONFLICT (key) DO NOTHING;

COMMIT;
