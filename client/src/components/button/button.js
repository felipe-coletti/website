import { buttonStyles } from './buttonStyles.js'

class Button extends HTMLElement {
    static get observedAttributes() {
        return ['variant', 'text', 'disabled', 'icon-only']
    }

    constructor() {
        super()
        
        const shadow = this.attachShadow({ mode: 'open' })
        
        shadow.adoptedStyleSheets = [buttonStyles]
        shadow.innerHTML = `<button id="btn"><slot></slot></button>`

        this._btn = shadow.getElementById('btn')
        this._handleClick = this._handleClick.bind(this)

        this._btn.addEventListener('click', this._handleClick)
    }

    connectedCallback() {
        this._updateContent()
        this._updateClasses()
    }

    disconnectedCallback() {
        this._btn.removeEventListener('click', this._handleClick)
    }

    get variant() { return this.getAttribute('variant') || 'filled' }
    set variant(val) { this.setAttribute('variant', val) }

    get disabled() { return this.hasAttribute('disabled') }
    set disabled(val) {
        if (val) this.setAttribute('disabled', '')
        else this.removeAttribute('disabled')
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return

        if (name === 'text') {
            this._updateContent()
        } else if (['variant', 'disabled', 'icon-only'].includes(name)) {
            this._updateClasses()
        }
    }

    _handleClick(e) {
        if (this.hasAttribute('disabled')) {
            e.stopPropagation()
            return
        }
        this.dispatchEvent(new CustomEvent('clique', {
            bubbles: true,
            composed: true,
            detail: { timestamp: Date.now() }
        }))
    }

    _updateContent() {
        const hasContent = Array.from(this.childNodes).some(
            node => node.nodeType !== Node.COMMENT_NODE
        )
        
        if (!hasContent) {
            this._btn.textContent = this.getAttribute('text') || 'Ação'
        }
    }

    _updateClasses() {
        this._btn.classList.remove('filled', 'outline', 'ghost', 'icon-only', 'disabled')

        const variant = this.getAttribute('variant') || 'filled'
        
        if (['filled', 'outline', 'ghost'].includes(variant)) {
            this._btn.classList.add(variant)
        } else {
            this._btn.classList.add('filled')
        }

        if (this.hasAttribute('icon-only')) {
            this._btn.classList.add('icon-only')
        }

        if (this.hasAttribute('disabled')) {
            this._btn.classList.add('disabled')
            this._btn.setAttribute('disabled', '')
            this._btn.setAttribute('aria-disabled', 'true')
            this._btn.tabIndex = -1
        } else {
            this._btn.removeAttribute('disabled')
            this._btn.removeAttribute('aria-disabled')
            this._btn.removeAttribute('tabIndex')
        }
    }
}

customElements.define('fc-button', Button)
