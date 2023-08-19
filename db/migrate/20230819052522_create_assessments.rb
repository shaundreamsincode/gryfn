class CreateAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :assessments do |t|
      t.references :accounts, foreign_key: true

      t.integer :survey_question_response_id
      t.integer :current_audio_question_id
      t.timestamps
    end
  end
end
