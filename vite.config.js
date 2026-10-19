import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Static hosts (GitHub Pages in particular) return a real 404 for any deep
 * link such as `/ai-video`, because no such file exists on disk. Emitting a
 * copy of the built entry document as `404.html` lets the host hand the SPA
 * back to the client, where the router resolves the correct route.
 *
 * The copy is flagged with `window.__SPA_FALLBACK__` so the inline normaliser
 * in `index.html` also strips a stray trailing slash before the asset tags are
 * parsed — otherwise `./assets/...` would resolve against the route instead of
 * the deployment base.
 */
function spaFallback() {
  let entryPath = ''

  return {
    name: 'spa-404-fallback',
    apply: 'build',
    configResolved(config) {
      entryPath = resolve(config.root, config.build.outDir, 'index.html')
    },
    closeBundle() {
      if (!entryPath || !existsSync(entryPath)) return

      const html = readFileSync(entryPath, 'utf8')
      const flagged = html.replace(
        '<title>',
        '<script>window.__SPA_FALLBACK__=true;</script>\n    <title>',
      )
      writeFileSync(resolve(entryPath, '..', '404.html'), flagged, 'utf8')
    },
  }
}

export default defineConfig({
  // relative base: the build works from a root domain, a sub-path, a preview
  // server or a plain file URL without needing a rebuild for each of them
  base: './',
  plugins: [react(), tailwindcss(), spaFallback()],
  build: {
    target: 'es2022',
    sourcemap: false,
    // the hero artwork and the twenty gallery photographs are the point of
    // this site — keep them as separate files rather than inlining them
    assetsInlineLimit: 2048,
    chunkSizeWarningLimit: 1200,
  },
})
