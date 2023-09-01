class CreateIntakeEideticQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :intake_eidetic_questions do |t|
      t.string :token

      t.integer :level, null: false, default: 0
      t.integer :index, null: false, default: 0

      t.references :intake_assessment, index: { name: 'index_eidetic_quest_on_assessment_idx' }
      t.string :answer
      t.string :correct_answer, null: false
      t.string :file_name, null: false

      t.timestamps
    end
  end
end
