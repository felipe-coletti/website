// fc-link.js
class Link extends HTMLElement {
  static get observedAttributes() {
    return ['to']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    
    // Estilos básicos (herdam do host se não especificado)
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline;
        }
        a {
          color: inherit;
          text-decoration: none;
          cursor: pointer;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
      <a part="link">
        <slot></slot>
      </a>
    `

    this._anchor = this.shadowRoot.querySelector('a')

    this._handleClick = this._handleClick.bind(this)
    this._anchor.addEventListener('click', this._handleClick)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'to') {
      this._anchor.setAttribute('href', newValue)
    }
  }

  _handleClick(e) {
    // Se for um link externo ou modificado (ctrl+click), deixa o navegador agir
    if (e.ctrlKey || e.metaKey || e.shiftKey) return
    
    const href = this._anchor.getAttribute('href')
    if (href && href.startsWith('/')) {
      e.preventDefault()
      
      // Dispara evento para o Router ouvir
      this.dispatchEvent(new CustomEvent('route-change', {
        bubbles: true,
        composed: true,
        detail: { path: href }
      }))
    }
  }
}

customElements.define('fc-link', Link)