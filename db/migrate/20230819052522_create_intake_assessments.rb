class CreateIntakeAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :intake_assessments do |t|
      t.string :token

      t.references :organization, foreign_key: true

      t.string :patient_first_name
      t.string :email
      t.integer :birth_year
      t.string :country
      t.string :zip_code

      t.string :level_of_education
      t.boolean :previously_diagnosed

      t.integer :current_speech_question_index
      t.integer :speech_assessment_grade_level # todo - rename to just grade
      t.integer :speech_assessment_current_level
      t.string :speech_assessment_correct_words, null: false, array: true, default: []
      t.string :speech_assessment_incorrect_words, null: false, array: true, default: []

      t.integer :eidetic_assessment_level
      t.integer :phonetic_assessment_level

      # enums
      t.integer :current_step, null: false, default: 0
      t.integer :assessment_type, null: false, default: 0

      t.timestamps
    end
  end
end
