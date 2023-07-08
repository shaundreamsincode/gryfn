class CreateUserOrganizationBadges < ActiveRecord::Migration[7.0]
  def change
    create_table :user_organization_badges do |t|
      t.string :token

      t.references :user, foreign_key: true
      t.references :organization_badge, foreign_key: true
      t.timestamps
    end
  end
end
