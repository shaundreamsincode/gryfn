class CreateChats < ActiveRecord::Migration[7.0]
  def change
    create_table :chats do |t|
      t.string :token
      t.references :user, foreign_key: true, null: true
      t.integer :language, null: false, default: 0 # enum - default to english
      t.datetime :closed_at

      t.timestamps
    end
  end
end
