class CreateIntakeAudioQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :intake_audio_questions do |t|
      t.string :token

      t.references :intake_assessment, index: { name: 'index_audio_quest_on_asses' }
      t.integer :index, null: false, default: 0
      t.string :answer, null: false
      t.string :path_to_audio_file, null: false
      t.string :question_type, null: false # todo - make enum (phonetic or eidetic)

      t.timestamps
    end
  end
end
