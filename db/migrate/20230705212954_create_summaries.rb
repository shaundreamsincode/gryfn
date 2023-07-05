class CreateSummaries < ActiveRecord::Migration[7.0]
  def change
    create_table :summaries do |t|
      t.string :token
      t.references :chat, foreign_key: true
      t.text :content, null: false

      t.timestamps
    end
  end
end
