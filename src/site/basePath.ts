/**
 * The production build is emitted with a *relative* base (`./`) so the same
 * output works from a root domain, a sub-path such as GitHub Pages, a preview
 * server or even a local file. React Router still needs to know that sub-path
 * at runtime, and the bundle always lives in `<base>/assets/`, so the URL of
 * this very module reveals it.
 *
 * In development there is no `assets` segment, so the base is simply `/`.
 *
 * NOTE: `import.meta.url` is read as a plain string (rather than the
 * `new URL('.', import.meta.url)` form) on purpose — the bundler must not try
 * to resolve it at build time, because its value only exists once the app is
 * running in the browser.
 */
export function detectBasePath(): string {
  try {
    const moduleUrl: string = import.meta.url
    // strip this module's filename, leaving the directory that contains it
    const directory = moduleUrl.slice(0, moduleUrl.lastIndexOf('/') + 1)
    const path = directory.replace(/^[a-z]+:\/\/[^/]+/i, '') // drop scheme + host

    if (/\/assets\/$/.test(path)) {
      const base = path.replace(/assets\/$/, '')
      return base.length > 1 ? base.replace(/\/$/, '') : '/'
    }
  } catch {
    /* import.meta.url unavailable — fall through */
  }
  return '/'
}
