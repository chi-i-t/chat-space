class AddGroupIdTolikes < ActiveRecord::Migration[5.0]
  def change
    add_column :likes, :group_id, :integer
  end
end
