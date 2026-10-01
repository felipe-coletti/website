# Front-end (Vanilla JS + Web Components)

Rotas → arquivos (servir via Go):
/ → index.html · /work → work.html · /blog → blog.html · /blog/{slug} → post.html · /sobre → sobre.html · /contato → contato.html
Estáticos: /css/*, /js/* servidos como arquivos.

API esperada:
- GET /api/posts?limit=N → [{slug,title,excerpt,published_at}]
- GET /api/posts/{slug} → {slug,title,excerpt,published_at,content_html}
- GET /api/works → [{slug,title,description,url,tags}]
