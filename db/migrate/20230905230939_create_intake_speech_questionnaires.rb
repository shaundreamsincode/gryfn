class CreateIntakeSpeechQuestionnaires < ActiveRecord::Migration[7.0]
  def change
    create_table :intake_speech_questionnaires do |t|
      t.integer :grade
      t.integer :current_level

      t.integer :current_question_id

      t.string :correct_words, null: false, array: true, default: []
      t.string :incorrect_words, null: false, array: true, default: []

      t.timestamps
    end
  end
end
