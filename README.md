# Convert-webp

拡張子がjpg/jpeg/pngなファイルをwebpに変換するツール。  
[sharp](https://github.com/lovell/sharp)を使ってます。コードサンプルとして利用。

## Required

Node.js v18.17.1。v16でも動くのは確認しています。  
Top-Level AwaitがNode.js v14.8.0からなので、コード的にはその辺。あとはsharp次第。

## Usage

```shell
# src/assets/images/*を監視
$ npm run webp:watch

# src/assets/images/*の全ファイルを一括変換
$ npm run webp:watch
```

`src/assets/images/**/*.{jpg|jpeg|png}`を`dist/assets/images/**/*.webp`に出力する。  
watchの場合、監視対象ファイル（src)が削除されると、出力画像（dist）も削除される。allは一方通行。

## ToDo

圧縮は通常必要ではないので、対応していない。sharpの機能としてはあるので、必要なら追加してください。
