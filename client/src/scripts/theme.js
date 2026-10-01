class ThemeManager {
  static setTheme(themeName) {
    if (['light', 'dim', 'dark'].includes(themeName)) {
      document.documentElement.setAttribute('data-theme', themeName)
      localStorage.setItem('app-theme', themeName)
    }
  }

  static init() {
    const savedTheme = localStorage.getItem('app-theme') || 'light'
    this.setTheme(savedTheme)
  }
}

ThemeManager.init()