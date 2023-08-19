class CreateIntakeSurveyResponses < ActiveRecord::Migration[7.0]
  def change
    create_table :intake_survey_responses do |t|
      t.string :token

      t.references :assessment

      t.string :highest_level_of_education, null: false
      t.boolean :previously_diagnosed_with_learning_disability, null: false
      t.datetime :date_of_last_eye_examination, null: false

      t.timestamps
    end
  end
end
