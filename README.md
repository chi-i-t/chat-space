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


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false,unique: true|

### Association
- has_many :messages
- has_many :groups_users
- has_many :users through: :groups_users


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

### Association
- belog_to :user
- belong_to :group