class CreateIntakeAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :intake_assessments do |t|
      t.string :token

      t.references :organization, foreign_key: true
      t.datetime :completed_at

      t.string :patient_first_name, null: false
      t.string :email, null: false
      t.datetime :date_of_birth
      t.string :country
      t.string :zip_code

      t.string :level_of_education
      t.boolean :previously_diagnosed

      t.integer :current_speech_question_index, null: false, default: 0
      t.integer :speech_assessment_grade_level # todo - rename to just grade
      t.integer :speech_assessment_current_level, null: false, default: 0

      # enums
      t.integer :current_step, null: false, default: 0
      t.integer :assessment_type, null: false, default: 0

      t.references :account, :created_by, foreign_key: { to_table: :accounts }

      t.timestamps
    end
  end
end
