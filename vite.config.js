import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const serviceWorkerTemplate = readFileSync(
  new URL('./src/pwa/service-worker.js', import.meta.url),
  'utf8',
)

function moduleOfflineSupport() {
  return {
    name: 'matekk-module-offline-support',
    apply: 'build',
    generateBundle(_options, bundle) {
      const assetsBySource = new Map()
      const assetsByName = new Map()
      Object.values(bundle).forEach((output) => {
        if (output.type !== 'asset') return
        assetsByName.set(output.name, output.fileName)
        const sourceNames = output.originalFileNames || []
        sourceNames.forEach((sourceName) => {
          assetsBySource.set(resolve(sourceName), output.fileName)
        })
      })

      const moduleAssetFiles = new Set()
      const visitedModules = new Set()
      const visitModule = (id) => {
        if (visitedModules.has(id) || id.includes('/node_modules/')) return
        visitedModules.add(id)
        const moduleInfo = this.getModuleInfo(id)
        if (!moduleInfo) return

        moduleInfo.importedIds.forEach((importedId) => {
          const sourceId = importedId.split('?')[0]
          const emittedAsset = assetsBySource.get(resolve(sourceId))
            || assetsByName.get(basename(sourceId))
          if (emittedAsset) {
            moduleAssetFiles.add(emittedAsset)
            return
          }
          if (/[\\/]src[\\/]/.test(sourceId)) visitModule(sourceId)
        })
      }
      Array.from(this.getModuleIds())
        .filter((id) => /[\\/]src[\\/]pages[\\/]modules[\\/]/.test(id))
        .filter((id) => !/(?:quiz|exam)/i.test(basename(id)) || /[\\/]ccnaOfflineExamQuestions\.js$/i.test(id))
        .forEach(visitModule)

      const offlineExhibitFiles = Object.values(bundle)
        .filter((output) => output.type === 'asset')
        .filter((output) => (output.originalFileNames || []).some((sourceName) => (
          /[\\/]assets[\\/](?:ccna-offline-exams-images|ccna-exam)[\\/]/i.test(sourceName)
        )))
        .map((output) => output.fileName)
      const precacheFiles = [
        ...Object.keys(bundle).filter((fileName) => (
          fileName === 'index.html'
          || /\.(?:js|css|woff2?|ttf|otf|eot)$/i.test(fileName)
          || moduleAssetFiles.has(fileName)
        )),
        ...offlineExhibitFiles,
        'manifest.webmanifest',
        'icons/matekk-icon.svg',
      ]
      const sortedPrecacheFiles = [...new Set(precacheFiles)].sort()
      const buildId = createHash('sha256')
        .update(Date.now().toString())
        .update(sortedPrecacheFiles.map((fileName) => {
          const output = bundle[fileName]
          if (!output) return fileName
          const content = output.type === 'chunk' ? output.code : output.source
          return `${fileName}\n${content}`
        }).join('\n'))
        .digest('hex')
        .slice(0, 12)
      const serviceWorker = serviceWorkerTemplate
        .replace('__BUILD_ID__', buildId)
        .replace("JSON.parse('[]')", `JSON.parse(${JSON.stringify(JSON.stringify(sortedPrecacheFiles))})`)

      this.emitFile({
        type: 'asset',
        fileName: 'sw.js',
        source: serviceWorker,
      })
    },
  }
}

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
    moduleOfflineSupport(),
  ],
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    target: 'esnext',
    cssCodeSplit: true,
    
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          'react-icons': ['react-icons'],
          'lucide-react': ['lucide-react'],
          'emailjs': ['@emailjs/browser', 'emailjs-com'],
          'captcha': ['@hcaptcha/react-hcaptcha', 'react-google-recaptcha'],
          'utils': ['dompurify'],
        },
        
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          if (extType === 'css') {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    
    assetsInlineLimit: 4096,
    reportCompressedSize: true,
  },
  
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-icons',
      'lucide-react',
      '@emailjs/browser',
      'dompurify',
    ],
  },
  
  server: {
    port: 5173,
    host: true,
    open: true,
    cors: true,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    hmr: {
      overlay: true,
    },
  },
  
  preview: {
    port: 4173,
    host: true,
    open: true,
    strictPort: false,
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
  
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    drop: ['console', 'debugger'],
  },
})