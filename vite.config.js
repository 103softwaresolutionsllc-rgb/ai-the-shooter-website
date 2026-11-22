import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the built site works from any path —
// a GitHub Pages project subpath today, a custom domain later.
export default defineConfig({
  plugins: [react()],
  base: './',
})
