class CreateIntakeAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :intake_assessments do |t|
      t.string :token

      t.references :organization, foreign_key: true

      t.string :patient_first_name #, null: false
      t.string :email #, null: false
      t.integer :birth_year #, null: false
      t.string :country #, null: false
      t.string :zip_code #, null: false

      t.string :level_of_education
      t.boolean :previously_diagnosed

      # enums
      t.integer :current_step, null: false, default: 0
      t.integer :assessment_type, null: false, default: 0

      t.timestamps
    end
  end
end
