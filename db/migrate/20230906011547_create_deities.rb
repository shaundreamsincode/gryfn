class CreateDeities < ActiveRecord::Migration[7.0]
  def change
    create_table :deities do |t|
      t.string :token

      t.string :email
      t.string :password_digest

      t.timestamps
    end
  end
end
