class HomePage extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 2rem;
        }
      </style>
      <h1>Bem-vindo à Home</h1>
      <p>Esta é a página inicial.</p>
      <fc-link to="/about">Ir para Sobre</fc-link>
    `
  }
}
customElements.define('fc-home-page', HomePage)