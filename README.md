# アプリ名
Chat Space

# 概要
- グループを作りグループメンバーとチャットができるアプリ（画像も投稿可）
- チャット投稿は自動更新される。
- グループ作成時にメンバーの検索機能がついている。

# 本番環境
- デプロイ先：http://52.199.231.160/

- テストアカウント１:はなこ
Eメール：11111@gmail.com
パスワード：11111qqqqq    (各5文字）

- テストアカウント２:たろう
Eメール：22222@gmail.com
パスワード：2222wwww    (各4文字）

# 制作背景(意図)
- プログラミングスクールのカリキュラムにて実装。
- アプリケーションをゼロからリリースをするまでの開発の流れを学ぶ。
- 今後、下記の追加したい機能を実装予定。

# 課題や今後実装したい機能
- ログイン、投稿、ログアウトの導線を考え、ページ遷移をスムーズにする。
- レスポンシブデザイン
- いいね機能の実装
- SNS認証ログインの追加

# DEMO
- ログイン画面 https://i.gyazo.com/7f22d6e37016e3fef01545ba78a6fc3a.png
- チャット画面 https://i.gyazo.com/0debb09d3ab40138fc3b497180080c48.png
- チャットグループ作成画面 https://i.gyazo.com/61a24ec9aabcf73ba82bc9186223985c.png
- チャット投稿の非同期通信 https://i.gyazo.com/6b32e84880acdf0f96489c2e2e8ed81f.mp4
- チャット画面の自動更新 https://i.gyazo.com/b3fbb5b3a4b9573186cb71828ae2b378.mp4

# 工夫したポイント
JavaScript/jQueryによって、以下を実装し使いやすいアプリにした。
- チャット投稿の非同期通信
- チャット画面の自動更新
- グループ作成時のユーザーをインクリメンタルサーチ

# 使用技術(開発環境)
Ruby/Ruby on Rails/JavaScript/jQuery/MySQL/Github/AWS/Visual Studio Code

# DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false,unique: true,index|
|email|string|null: false,unique: true,index|
|password|string|null: false|

### Association
- has_many :messages
- has_many :groups_users
- has_many :groups through: :groups_users
- has_many :likes


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false,unique: true|

### Association
- has_many :messages
- has_many :groups_users
- has_many :users through: :groups_users
- has_many :likes


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false,foreign_key: true|
|user_id|integer|null: false,foreign_key: true|

### Association
- belog_to :group
- belong_to :user


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|null: false,foreign_key: true|
|user_id|integer|null: false,foreign_key: true|
|likes_count|integer|

### Association
- belog_to :user
- belong_to :group
- has_many :likes


## likesテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer||
|message_id|integer||
|group_id|integer||

### Association
- belog_to :user
- belog_to :message
- belog_to :group
