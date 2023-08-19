class CreateAudioQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :audio_questions do |t|
      t.references :assessments, foreign_key: true
      t.integer :index, null: false, default: 0
      t.string :answer, null: false
      t.string :path_to_audio_file, null: false
      t.string :question_type, null: false # todo - make enum (phonetic or eidetic)

      t.timestamps
    end
  end
end
