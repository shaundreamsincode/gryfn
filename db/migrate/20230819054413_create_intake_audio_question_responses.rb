class CreateIntakeAudioQuestionResponses < ActiveRecord::Migration[7.0]
  def change
    create_table :intake_audio_question_responses do |t|
      t.string :token

      t.references :intake_audio_question, index: { name: 'index_audio_on_question_id' }
      t.string :content, null: false

      t.timestamps
    end
  end
end
