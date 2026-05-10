import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        addToCart: resolve(__dirname, "addToCart.html"),
        signIn: resolve(__dirname, "signIn.html"),
        signUp: resolve(__dirname, "signUp.html"),
      },
    },
  },
});
