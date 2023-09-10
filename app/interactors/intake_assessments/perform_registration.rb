module IntakeAssessments
  class PerformRegistration
    include Interactor

    def call
      intake_assessment = context.intake_assessment

      intake_assessment.update!(
        assessment_type: calculate_assessment_type,
        birth_year: context.birth_year,
        country: context.country,
        zip_code: context.zip_code,
        previously_diagnosed: context.previously_diagnosed,
        level_of_education: context.level_of_education,
      )

      IntakeAssessments::CreateSpeechQuestions.call(assessment: intake_assessment)
      IntakeAssessments::MoveToNextStep.call(assessment: intake_assessment)
    end

    private def calculate_assessment_type
      if Time.now.year - context.birth_year.to_i < 18
        return IntakeAssessment::ASSESSMENT_TYPES[:desd]
      end

      IntakeAssessment::ASSESSMENT_TYPES[:adt]
    end
  end
end
