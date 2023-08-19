class CreateAudioQuestionResponses < ActiveRecord::Migration[7.0]
  def change
    create_table :audio_question_responses do |t|
      t.references :audio_question, foreign_key: true
      t.string :content, null: false

      t.timestamps
    end
  end
end
