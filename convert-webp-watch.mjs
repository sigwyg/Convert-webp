import fs from "fs";
import path from "path";
import sharp from "sharp";

/**
 * Convert image to webp
 * - 圧縮はしない
 * - png/jpg/jpegをwebpに変換するだけ
 *
 * Usage: node convert-webp-watch.mjs src/assets/images/xxx.jpg
 *
 * argv[0] = node
 * argv[1] = convert-webp-watch.mjs
 * argv[2] = src/assets/images/xxx.jpg
 */
const dirName = path.dirname(process.argv[2]);
const fileName = path.basename(process.argv[2]);
const outputDir = `dest${dirName.replace("src", "")}`;
const outputPathFilename = `${outputDir}/${fileName.replace(
  /\.[^/.]+$/,
  ".webp"
)}`;

// 拡張子を取得
function getExtension(file) {
  const ext = path.extname(file || "").split(".");
  return ext[ext.length - 1];
}
const fileFormat = getExtension(fileName);

(() => {
  // 対象の画像形式でなければ処理しない
  const regex = /^(jpg|png|jpeg)$/;
  if (!regex.test(fileFormat)) {
    console.log("\u001b[1;31m Unrecognized file format.");
    return;
  }

  // destにディレクトリがなければ作成
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // sharp で変換
  sharp(process.argv[2])
    .webp({ quality: 70 })
    .toFile(outputPathFilename)
    .then((info) => {
      // 成功：ファイル名とサイズを表示
      console.log(
        `\u001b[1;32m ${outputPathFilename} created. (${info.size / 1000}KB)`
      );
    })
    .catch((err) => {
      // 失敗：distから削除
      if (fs.existsSync(outputPathFilename)) {
        fs.unlinkSync(outputPathFilename);
        console.log(`\u001b[1;33m ${outputPathFilename} deleted.`);
      }
    });
})();
