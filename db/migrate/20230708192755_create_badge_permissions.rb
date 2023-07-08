class CreateBadgePermissions < ActiveRecord::Migration[7.0]
  def change
    create_table :badge_permissions do |t|
      t.string :token

      t.references :badge, foreign_key: true
      t.string :name
      t.text :canonical_name
      t.text :description

      t.timestamps
    end
  end
end
