class CreateBadges < ActiveRecord::Migration[7.0]
  def change
    create_table :badges do |t|
      t.string :token

      t.references :organization, foreign_key: true
      t.references :account, foreign_key: true

      t.integer :role, null: false, default: 0 # enum

      t.timestamps
    end
  end
end
