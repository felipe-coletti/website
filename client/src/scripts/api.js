// Mesma origem: o servidor Go serve tanto o client quanto a API
const API_BASE = ''

async function request(path) {
    const res = await fetch(`${API_BASE}${path}`, { headers: { Accept: 'application/json' } })

    if (res.status === 404) return null
    if (!res.ok) throw new Error(`Request to ${path} failed with status ${res.status}`)

    return res.json()
}

function withTag(path, tag) {
    return tag ? `${path}?tag=${encodeURIComponent(tag)}` : path
}

export const api = {
    posts: {
        list: async ({ tag } = {}) => (await request(withTag('/api/posts', tag))) ?? [],
        get: (slug) => request(`/api/posts/${encodeURIComponent(slug)}`)
    },
    works: {
        list: async ({ tag } = {}) => (await request(withTag('/api/works', tag))) ?? [],
        get: (slug) => request(`/api/works/${encodeURIComponent(slug)}`)
    },
    tags: {
        list: async () => (await request('/api/tags')) ?? []
    },
    content: {
        // Texto fixo do site pela chave (ex: 'welcome'); null quando não existe
        get: (key) => request(`/api/content/${encodeURIComponent(key)}`)
    }
}
