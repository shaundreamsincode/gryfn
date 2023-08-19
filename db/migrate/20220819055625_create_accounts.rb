class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts do |t|
      t.string :token

      t.string :name , null: false
      t.string :email , null: false
      t.integer :birth_year , null: false
      t.string :country , null: false
      t.string :zip_code , null: false
      t.string :password_digest, null: false
      # gender?
      t.timestamps
    end
  end
end
