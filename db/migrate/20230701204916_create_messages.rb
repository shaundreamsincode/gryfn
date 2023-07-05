class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.references :chat, foreign_key: true
      t.integer :role, null: false, default: 0 # enum - default to system
      t.text :content, null: false
      t.boolean :is_prompt, null: false, default: false

      t.timestamps
    end
  end
end
