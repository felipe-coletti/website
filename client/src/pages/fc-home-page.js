import '../components/postList/fc-post-list.js'
import { baseStyles, pageStyles } from '../styles/base.js'
import { api } from '../scripts/api.js'

const LATEST_POSTS_LIMIT = 3

const sheet = new CSSStyleSheet()

sheet.replaceSync(`
    .page {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .latest h2 {
        font-size: var(--text-h4);
    }
`)

class HomePage extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: 'open' })

        shadow.adoptedStyleSheets = [baseStyles, pageStyles, sheet]
        shadow.innerHTML = `
            <main class="page">
                <section class="section">
                    <h1>Welcome</h1>
                </section>
                <section class="section latest" hidden>
                    <h2>Latest blog posts</h2>
                    <fc-post-list></fc-post-list>
                </section>
            </main>
        `

        this._latest = shadow.querySelector('.latest')
        this._postList = shadow.querySelector('fc-post-list')
    }

    connectedCallback() {
        this._loadLatestPosts()
    }

    async _loadLatestPosts() {
        try {
            const posts = await api.posts.list()
            const latest = posts.slice(0, LATEST_POSTS_LIMIT)

            if (latest.length === 0) return

            this._postList.posts = latest
            this._latest.hidden = false
        } catch (error) {
            // A seção é opcional: se a API falhar, a home continua funcionando sem ela
            console.error(error)
        }
    }
}

customElements.define('fc-home-page', HomePage)
