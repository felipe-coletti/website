import { matchRoute, pageTitle } from '../../routes.js'
import { NAVIGATE_EVENT, ROUTE_RENDERED_EVENT } from '../../scripts/navigation.js'

const sheet = new CSSStyleSheet()

sheet.replaceSync(`
    :host {
        display: flex;
        flex-direction: column;
    }

    #outlet {
        display: flex;
        flex: 1;
        flex-direction: column;
    }

    #outlet > * {
        flex: 1;
    }
`)

class Router extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: 'open' })

        shadow.adoptedStyleSheets = [sheet]
        shadow.innerHTML = `<div id="outlet"></div>`

        this._outlet = shadow.getElementById('outlet')
        this._renderId = 0

        this._handlePopState = () => this._render()
        this._handleNavigate = (e) => this.navigate(e.detail.path)
    }

    connectedCallback() {
        // Botões voltar/avançar do navegador
        window.addEventListener('popstate', this._handlePopState)
        // Pedidos de navegação vindos dos componentes (fc-link, fc-post-card, ...)
        window.addEventListener(NAVIGATE_EVENT, this._handleNavigate)

        this._render()
    }

    disconnectedCallback() {
        window.removeEventListener('popstate', this._handlePopState)
        window.removeEventListener(NAVIGATE_EVENT, this._handleNavigate)
    }

    /**
     * Navega para um novo caminho sem recarregar a página
     * @param {string} path - ex: '/about'
     */
    navigate(path) {
        const current = window.location.pathname + window.location.search + window.location.hash
        if (path === current) return

        window.history.pushState({}, '', path)
        this._render()
    }

    async _render() {
        const renderId = ++this._renderId
        const path = window.location.pathname
        const { route, params } = matchRoute(path)

        try {
            await route.load()
        } catch (error) {
            console.error(error)
            if (renderId !== this._renderId) return
            this._outlet.innerHTML = '<p>Failed to load page</p>'
            return
        }

        // Uma navegação mais recente começou enquanto esta página carregava
        if (renderId !== this._renderId) return

        const page = document.createElement(route.tag)

        for (const [key, value] of Object.entries(params)) {
            page.setAttribute(key, value)
        }

        this._outlet.replaceChildren(page)

        document.title = pageTitle(route.title)
        window.scrollTo(0, 0)

        window.dispatchEvent(new CustomEvent(ROUTE_RENDERED_EVENT, { detail: { path, params } }))
    }
}

customElements.define('fc-router', Router)
