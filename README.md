# Convert-webp

拡張子がjpg/jpeg/pngなファイルをwebpに変換するツール。  
[sharp](https://github.com/lovell/sharp)を使ってます。

## Required

Node.js v18.17.1。v16でも動くのは確認しています。  
Top-Level AwaitがNode.js v14.8.0からなので、コード的にはその辺。あとはshap次第。

## Usage

```
# src/assets/images/*を監視
$ npm run webp:watch

# src/assets/images/*の全ファイルを一括変換
$ npm run webp:watch
```

## ToDo

圧縮は通常必要ではないので、対応していない。sharpの機能としてはあるので、必要なら追加してください。
