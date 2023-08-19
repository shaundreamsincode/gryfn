class CreateIntakeAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :intake_assessments do |t|
      t.string :token

      t.references :account, foreign_key: true
      t.references :intake_survey_response, foreign_key: true
      t.integer :current_audio_question_id
      t.timestamps
    end
  end
end
