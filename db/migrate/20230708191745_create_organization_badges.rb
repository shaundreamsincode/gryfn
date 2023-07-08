class CreateOrganizationBadges < ActiveRecord::Migration[7.0]
  def change
    create_table :organization_badges do |t|
      t.string :token

      t.references :organization, foreign_key: true
      t.references :badge, foreign_key: true
      t.timestamps
    end
  end
end
