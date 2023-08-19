class CreateIntakeQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :intake_questions do |t|
      t.string :token

      t.references :intake_assessment, index: { name: 'index_quest_on_assessment' }
      t.integer :index, null: false, default: 0
      t.string :answer, null: false
      t.string :file_name, null: false

      t.timestamps
    end
  end
end
