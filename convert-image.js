// convert-image.js
import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./public/images";
const outputDir = "./public/images";

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

fs.readdirSync(inputDir).forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  if ([".png", ".jpg", ".jpeg"].includes(ext)) {
    sharp(path.join(inputDir, file))
      .webp({ quality: 80 })
      .toFile(path.join(outputDir, path.basename(file, ext) + ".webp"));
  }
});
