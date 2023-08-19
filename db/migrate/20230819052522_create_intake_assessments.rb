class CreateIntakeAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :intake_assessments do |t|
      t.string :token

      t.references :account, foreign_key: true

      t.string :level_of_education
      t.boolean :previously_diagnosed
      t.datetime :last_eye_exam_at

      t.integer :current_question_index, default: 0
      t.timestamps
    end
  end
end
