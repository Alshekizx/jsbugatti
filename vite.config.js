import { defineConfig } from 'vite';

export default defineConfig({
    base: 'jsbugatti',

    build: {
        outDir: 'dist',
        
      },
      server: {
        port: 3000, // Set the development server port
      },
      // If your project has a specific entry point, you can specify it here
      // entry: 'path/to/your/entry.js',
    
      // If you're using vanilla JavaScript, you may not need additional plugins,
      // but you can configure them if necessary
      // plugins: [yourPlugin()],
    
      // Configure Vite to resolve modules from the 'src' directory
      resolve: {
        alias: {
          '@': '/src',
        },
      },
      
});