class CreateIntakeSummaries < ActiveRecord::Migration[7.0]
  def change
    create_table :intake_summaries do |t|
      t.references :intake_assessment, foreign_key: true # todo - add indexes to questions...?

      t.string :correct_speech_questions, array: true, default: []
      t.string :incorrect_speech_questions, array: true, default: []

      t.string :correct_eidetic_questions, array: true, default: []
      t.string :incorrect_eidetic_questions, array: true, default: []

      t.string :correct_phonetic_questions, array: true, default: []
      t.string :incorrect_phonetic_questions, array: true, default: []

      t.timestamps
    end
  end
end
