class CreateIntakeSurveyResponses < ActiveRecord::Migration[7.0]
  def change
    create_table :intake_survey_responses do |t|
      t.string :token

      t.references :intake_assessment
      t.timestamps
    end
  end
end
