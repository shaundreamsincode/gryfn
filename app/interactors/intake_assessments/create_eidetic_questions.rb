class IntakeAssessments::CreateEideticQuestions
  include Interactor

  def call
    speech_questions = context.intake_assessment.speech_questions
    grade_index = context.intake_assessment.intake_assessment.grade_index


  end

  private def fetch_assessment_words

  end
end
