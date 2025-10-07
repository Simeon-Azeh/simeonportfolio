
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Manual chunking to reduce large index bundle and improve caching.
// Adjust the vendor keys to match the heavy deps in your project.
export default defineConfig({
  plugins: [react()],
  build: {
    // Raise warning limit if you still want to see warnings only for very large chunks
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor_react'
            if (id.includes('framer-motion')) return 'vendor_framer-motion'
            if (id.includes('react-icons')) return 'vendor_icons'
            if (id.includes('firebase')) return 'vendor_firebase'
            if (id.includes('antd') || id.includes('@ant-design')) return 'vendor_antd'
            if (id.includes('tsparticles') || id.includes('react-tsparticles')) return 'vendor_particles'
            if (id.includes('lodash')) return 'vendor_lodash'
            // fallback for other node_modules
            return 'vendor_misc'
          }
        }
      }
    }
    // optional: enable sourcemap to inspect bundles locally (disable for production if you prefer)
    // sourcemap: true
  }
})
