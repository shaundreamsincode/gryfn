class CreateOrganizations < ActiveRecord::Migration[7.0]
  def change
    create_table :organizations do |t|
      t.string :token
      t.string :name

      t.timestamps
    end
  end
end
