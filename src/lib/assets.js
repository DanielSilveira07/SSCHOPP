// Prepends Vite's base URL so paths work both locally and on GitHub Pages.
const base = import.meta.env.BASE_URL.replace(/\/$/, '')
export const asset = (path) => `${base}${path}`
