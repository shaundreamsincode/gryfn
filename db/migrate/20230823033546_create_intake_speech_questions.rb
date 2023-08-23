class CreateIntakeSpeechQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :intake_speech_questions do |t| # todo - null: true any?
      t.string :token
      t.string :file_name
      t.string :answer
      t.string :correct_answer

      t.references :intake_assessment, index: { name: 'index_speech_quest_on_assessment' }
      t.timestamps
    end
  end
end
