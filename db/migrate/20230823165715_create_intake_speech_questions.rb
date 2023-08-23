class CreateIntakeSpeechQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :intake_speech_questions do |t|
      t.string :token

      t.references :intake_assessment, foreign_key: true

      t.string :answer
      t.string :correct_answer
      t.timestamps
    end
  end
end
