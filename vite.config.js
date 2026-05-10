import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        addToCart: "addToCart.html",
        signIn: "signIn.html",
        signUp: "signUp.html",
      },
    },
  },
});
