# 書籍管理システム

個人でホストする書籍管理Webアプリケーション

## requirement

- MySQL Server
    事前に書籍管理用のユーザーとデータベースを用意しておいて下さい
- node && npm (最低8以上、12以上がおすすめ)

## 初期設定

以下のようにコピーしてください

frontend/example.env -> frontend/.env
backend/example.env -> backend/.env

それぞれの.envの内容はデプロイの環境に合わせてください

## デプロイ

### frontend

frontendフォルダに移動して

```bash
$ npm install && npm run build
```

でbuildフォルダ以下にビルドされたものが置かれます。あとはこれをお好みのwebサーバーでホストしてください。

### backend

こちらもフロントエンド同様、backendフォルダに移動後

```bash
$ npm install && npm run build
```

ビルドされたものがdistに置かれるので、`node dist/main.js`でサーバーが立ち上がります。

サービス化するなどはお任せです。