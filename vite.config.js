import { defineConfig } from 'vite';

export default defineConfig({
    base: 'jsbugatti',

    build: {
        outDir: 'dist',
        
      },
      server: {
        port: 3000, // Set the development server port
      },
    
      resolve: {
        alias: {
          '@': '/src',
        },
      },
      
});