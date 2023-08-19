class CreateIntakeSurveyResponse
  include Interactor

  def call
    # context.intake_assessment
    # t.string :highest_level_of_education, null: false
    # t.boolean :previously_diagnosed_with_learning_disability, null: false
    # t.datetime :date_of_last_eye_examination, null: false

    context.survey_response = CreateIntakeSurveyResponse.create!(
      highest_level_of_education: context.highest_level_of_education,
      previously_diagnosed_with_learning_disability: context.previously_diagnosed_with_learning_disability,
      date_of_last_eye_examination: context.date_of_last_eye_examination,
      intake_assessment: context.intake_assessment
    )

    # context.intake_assessment.move_to_next_step! (?)
  end
end
