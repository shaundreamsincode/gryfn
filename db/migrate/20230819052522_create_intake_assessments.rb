class CreateIntakeAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :intake_assessments do |t|
      t.string :token

      t.references :organization, foreign_key: true

      t.string :name #, null: false
      t.string :email #, null: false
      t.integer :birth_year #, null: false
      t.string :country #, null: false
      t.string :zip_code #, null: false

      t.string :level_of_education
      t.boolean :previously_diagnosed

      t.integer :current_question_index, default: 0

      t.timestamps
    end
  end
end
