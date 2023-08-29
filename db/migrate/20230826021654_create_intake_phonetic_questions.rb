class CreateIntakePhoneticQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :intake_phonetic_questions do |t|

      t.string :token

      t.references :intake_assessment, index: { name: 'index_phonetic_quest_on_assessment_idx' }
      t.integer :index, null: false, default: 0
      t.string :answer
      t.string :correct_answer, null: false
      t.string :phonetic_sets, array: true, array_dimension: 2,default: [] # todo - rename to like prononciations?
      t.string :file_name, null: false

      # phonetic set
      t.timestamps
    end
  end
end
