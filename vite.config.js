import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/gdetotaknado/' : '/',
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
  },
})
