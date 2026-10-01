// Evento que os componentes disparam para pedir uma navegação ao fc-router
export const NAVIGATE_EVENT = 'route-change'

// Evento que o fc-router dispara depois de renderizar uma rota
export const ROUTE_RENDERED_EVENT = 'route-rendered'

export function navigate(path) {
    window.dispatchEvent(new CustomEvent(NAVIGATE_EVENT, { detail: { path } }))
}

export function isInternal(href) {
    try {
        return new URL(href, window.location.origin).origin === window.location.origin
    } catch {
        return false
    }
}

/**
 * Intercepta o clique em um <a> interno e navega sem recarregar a página.
 * Cliques com modificadores (ctrl/cmd/shift/alt) ou botão do meio seguem o comportamento nativo.
 */
export function handleLinkClick(e, href) {
    if (e.defaultPrevented || e.button !== 0) return
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return
    if (!href || !isInternal(href)) return

    e.preventDefault()

    const url = new URL(href, window.location.origin)
    navigate(url.pathname + url.search + url.hash)
}
