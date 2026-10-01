-- Migração para um banco criado antes do schema.sql existir
-- (projetos com slug baseado no nome). Troca os slugs atuais por IDs aleatórios.
--   psql -d website -f server/db/migrate-work-slugs.sql
--
-- ATENÇÃO: muda as URLs de todos os projetos existentes.

BEGIN;

CREATE OR REPLACE FUNCTION generate_work_slug() RETURNS TEXT AS $$
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

UPDATE works SET slug = generate_work_slug() WHERE slug !~ '^[0-9a-z]{6}$';

ALTER TABLE works ALTER COLUMN slug SET DEFAULT generate_work_slug();
ALTER TABLE works DROP CONSTRAINT IF EXISTS works_slug_check;
ALTER TABLE works ADD CONSTRAINT works_slug_check CHECK (slug ~ '^[0-9a-z]{6}$');

COMMIT;
