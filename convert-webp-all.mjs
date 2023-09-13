import fs from "fs";
import path from "path";
import { glob } from "glob";
import sharp from "sharp";

/**
 * Convert image to webp
 * - 圧縮はしない
 * - png/jpg/jpegをwebpに変換するだけ
 *
 * @example
 * $ node convert-webp.mjs
 *
 * @todo 雑に連番を振っているが、順序は保証されない
 *
 */
const targetDir = "src/assets/images";

// 拡張子を取得
function getExtension(file) {
  const ext = path.extname(file || "").split(".");
  return ext[ext.length - 1];
}

// 対象画像の配列を取得
const images = await glob([`${targetDir}/**/*.{jpg,jpeg,png}`]);

// 画像ごとに処理
images.map((image, index) => {
  const pathName = path.dirname(image);
  const fileName = path.basename(image);
  const fileFormat = getExtension(fileName);

  // 対象の画像形式でなければ処理しない
  const regex = /^(jpg|png|jpeg)$/;
  if (!regex.test(fileFormat)) {
    console.log("\u001b[1;31m Unrecognized file format.");
    return;
  }

  // distにサブディレクトリがなければ作成
  const outputSubDir = `dist${pathName.replace("src", "")}`;
  if (!fs.existsSync(outputSubDir)) {
    fs.mkdirSync(outputSubDir, { recursive: true });
  }

  const outputPathFilename = `${outputSubDir}/${fileName.replace(
    /\.[^/.]+$/,
    ".webp",
  )}`;

  // sharp で変換
  sharp(image)
    .webp({ quality: 70 })
    .toFile(outputPathFilename)
    .then((info) => {
      // 成功：ファイル名とサイズを表示
      console.log(
        `\u001b[1;32m ${index + 1}: ${outputPathFilename} (${info.size / 1000
        }KB)`,
      );
    })
    .catch((err) => {
      console.error(err);
    });
});
