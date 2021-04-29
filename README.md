# BBS
個人的な勉強用。  
CRUDを全て学べるので掲示板を作成する。  
レビューなどで改善点や指摘があった場合、随時修正する。  

# 画面サンプル
[![Image from Gyazo](https://i.gyazo.com/608906ac710868f5621d5914ae3d56d6.png)](https://gyazo.com/608906ac710868f5621d5914ae3d56d6)

# 機能
- 投稿表示
- 新規投稿
- 投稿削除

# サーバ環境

|名前|役割|
|---|---|
|scss|デザイン全般|
|Next.js(React.js)|フロントエンド|
|Node.js|サーバーサイド|
|MySQL|データベース|

# 実際に動作を確認する

動作させるにはMySQLとNode.jsをインストールした環境が必要。
環境が用意できたら下記手順を実行！

1. 任意のディレクトリでリポジトリの取得
```
$ git clone https://github.com/okioka/BBS
```

2. next.jsの動作に必要なnode_modulesをインストール
```
$ cd BBS/next-app
$ npm install
```

3. DBの準備  
BBS/DB内に存在するyyyyMMddHHmm_create_posts.sqlのテーブル作成SQLを実行。  
ここではBBSという名前のデータベースにテーブルを作成しているが環境に応じて変更してもよい。
必要であれば作成したテーブルにyyyyMMddHHmm_insert_testdatas.sql内のテストデータを追加する。  
※MySQLのバージョンが8の場合はエラーが発生するので下記SQLで回避する。  
```
mysql > alter user root@localhost identified with mysql_native_password by '';
```

4. apiのDB接続情報の設定  
BBS/api/dbConnection.js内のDB接続情報を環境に合わせて設定する。  
設定する場所は以下の三つ
- user(MySQLのユーザー名)
- password(ユーザーのパスワード)
- database(手順3でテーブルを作成したデータベース名)

5. apiの起動
```
$ cd BBS/api
$ node index.js
```

6. プロジェクトの実行  
※手順5とは別のターミナルを開いて実行
```
$ cd BBS/next-app
$ npm run dev
```

7. 掲示板のページを開く  
[http://localhost:3000/](http://localhost:3000/)にアクセス！  
これで掲示板の動作を確認できる。
