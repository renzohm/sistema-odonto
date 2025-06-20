import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/sistema-odonto/' : '/', // base path solo en producción
  server: {
    host: '0.0.0.0',  // Expone el servidor a la red local
    port: 5173,        // Cambia el puerto si es necesario
  },
}))
