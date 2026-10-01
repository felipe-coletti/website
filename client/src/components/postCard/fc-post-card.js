import { postCardStyles } from './fc-post-card.styles.js'

class PostCard extends HTMLElement {
    static get observedAttributes() {
        return ['to', 'date', 'title']
    }

    constructor() {
        super()
        
        const shadow = this.attachShadow({ mode: 'open' })

        shadow.adoptedStyleSheets = [postCardStyles]
        shadow.innerHTML = `
        <article class="post">
            <span class="date text" part="date"></span>
            <a class="link" part="link">
            <h2 class="title" part="title"></h2>
            </a>
        </article>
        `

        this._date = shadow.querySelector('.date')
        this._link = shadow.querySelector('.link')
        this._title = shadow.querySelector('.title')

        this._link.addEventListener('click', (e) => this._handleClick(e))
    }

    connectedCallback() {
        this._updateContent()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return
        this._updateContent()
    }

    get to() { return this.getAttribute('to') || '#' }
    set to(val) { this.setAttribute('to', val) }

    get date() { return this.getAttribute('date') || '' }
    set date(val) { this.setAttribute('date', val) }

    get title() { return this.getAttribute('title') || 'Sem título' }
    set title(val) { this.setAttribute('title', val) }

    _updateContent() {
        this._date.textContent = this.date
        this._title.textContent = this.title
        this._link.setAttribute('href', this.to)
    }

    _handleClick(e) {
        e.preventDefault()
        
        const href = this._link.getAttribute('href')
        
        if (href && href.startsWith('/')) {
            window.history.pushState({}, '', href)
            
            this.dispatchEvent(new CustomEvent('route-change', { 
                bubbles: true, 
                composed: true,
                detail: { path: href } 
            }))
        }
    }
}

customElements.define('fc-post-card', PostCard)