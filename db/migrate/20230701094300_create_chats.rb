class CreateChats < ActiveRecord::Migration[7.0]
  def change
    create_table :chats do |t|
      t.references :user, foreign_key: true, null: true
      t.string :token
      t.datetime :closed_at

      t.timestamps
    end
  end
end
