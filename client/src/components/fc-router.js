// fc-router.js
class Router extends HTMLElement {
  static get observedAttributes() {
    return ['path']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }
      </style>
      <div id="outlet"></div>
    `
    this._outlet = this.shadowRoot.getElementById('outlet')
    
    // Mapeamento de Rotas (Path -> Tag Name)
    this._routes = {
      '/': 'fc-home-page',
      '/about': 'fc-about-page',
      '/posts': 'fc-posts-list-page',
      // Adicione outras rotas aqui
    }

    // Escuta mudanças no histórico do navegador (botão voltar/avançar)
    window.addEventListener('popstate', () => this._handleRouteChange())

    // Escuta eventos disparados pelos componentes (ex: fc-post-card)
    window.addEventListener('route-change', (e) => {
      this.navigate(e.detail.path)
    })
  }

  connectedCallback() {
    // Inicializa a rota atual
    this._handleRouteChange()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'path' && oldValue !== newValue) {
      this._renderRoute(newValue)
    }
  }

  /**
   * Navega para um novo caminho
   * @param {string} path - ex: '/about'
   */
  navigate(path) {
    if (path === this.getAttribute('path')) return
    
    // Atualiza a URL sem recarregar
    window.history.pushState({ path }, '', path)
    
    // Atualiza o atributo do componente (dispara attributeChangedCallback)
    this.setAttribute('path', path)
  }

  _handleRouteChange() {
    const path = window.location.pathname
    this.setAttribute('path', path)
  }

  _renderRoute(path) {
    const tagName = this._routes[path]
    if (!tagName) {
      // Rota não encontrada (404)
      this._outlet.innerHTML = '<p>Página não encontrada</p>'
      return
    }

    // Limpa o outlet
    this._outlet.innerHTML = ''
    
    // Cria e adiciona o componente da página
    const page = document.createElement(tagName)
    this._outlet.appendChild(page)
  }
}

customElements.define('fc-router', Router)