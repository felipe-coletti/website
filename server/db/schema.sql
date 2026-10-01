-- Schema do banco. Rode uma vez em um banco vazio:
--   psql -d website -f server/db/schema.sql

-- Posts usam slug legível, escrito à mão (ex: 'leaving-react').
-- Projetos usam um ID curto e aleatório (ex: 'k3x9a2'), gerado pelo próprio banco:
-- a URL não muda se o projeto for renomeado.

CREATE TABLE tags (
    id   SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL
);

CREATE TABLE posts (
    id           SERIAL PRIMARY KEY,
    title        TEXT NOT NULL,
    slug         TEXT UNIQUE NOT NULL CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
    content      TEXT,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    published_at TIMESTAMPTZ
);

-- Gera um ID de 6 caracteres [0-9a-z] que ainda não esteja em uso em works.slug.
-- 36^6 ≈ 2,2 bilhões de combinações: o loop praticamente nunca repete.
CREATE FUNCTION generate_work_slug() RETURNS TEXT AS $$
DECLARE
    alphabet CONSTANT TEXT := '0123456789abcdefghijklmnopqrstuvwxyz';
    candidate TEXT;
BEGIN
    LOOP
        candidate := '';

        FOR i IN 1..6 LOOP
            candidate := candidate || substr(alphabet, 1 + floor(random() * 36)::INT, 1);
        END LOOP;

        EXIT WHEN NOT EXISTS (SELECT 1 FROM works WHERE slug = candidate);
    END LOOP;

    RETURN candidate;
END;
$$ LANGUAGE plpgsql VOLATILE;

CREATE TABLE works (
    id           SERIAL PRIMARY KEY,
    title        TEXT NOT NULL,
    slug         TEXT UNIQUE NOT NULL DEFAULT generate_work_slug() CHECK (slug ~ '^[0-9a-z]{6}$'),
    content      TEXT,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    published_at TIMESTAMPTZ
);

CREATE TABLE posts_tags (
    post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    tag_id  INT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

CREATE TABLE works_tags (
    work_id INT NOT NULL REFERENCES works(id) ON DELETE CASCADE,
    tag_id  INT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (work_id, tag_id)
);

-- Textos fixos do site, editáveis sem mexer no código (futuro painel admin).
-- `key` identifica onde o texto aparece (ex: 'welcome' na home); `value` é HTML.
CREATE TABLE site_content (
    key        TEXT PRIMARY KEY CHECK (key ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
    value      TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
