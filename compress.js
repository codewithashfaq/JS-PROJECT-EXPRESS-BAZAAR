// compress-hero.js
import sharp from "sharp";

sharp("./public/images/empty-cart.webp")
  .resize(800) // width 800px — kaafi hai for display purposes
  .webp({ quality: 60 })
  .toFile("./public/images/heroImage-optimized.webp");
