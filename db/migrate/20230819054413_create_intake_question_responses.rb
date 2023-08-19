class CreateIntakeQuestionResponses < ActiveRecord::Migration[7.0]
  def change
    create_table :intake_question_responses do |t|
      t.string :token

      t.references :intake_question, index: { name: 'index_on_resp_and_question_id' }
      t.string :content, null: false

      t.timestamps
    end
  end
end
