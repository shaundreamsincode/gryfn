class IntakeAssessments::CompleteSpeechAssessment
  include Interactor

  def call
    assessment = context.assessment
    assessment.speech_assessment_grade_level = calc_speech_assessment_grade_level(assessment)
    assessment.save!

    create_eidetic_questions!(assessment)
    create_phonetic_questions!(assessment)

    context.assessment = assessment.reload
  end

  # should return an integer
  private def calc_speech_assessment_grade_level(assessment)
    grade = 0

    assessment.level_count.times do |level|
      correct_at_level = IntakeSpeechQuestion.where(
        intake_assessment: context.assessment,
        level: level
      ).select { |question| question.is_correct? }

      grade = level if correct_at_level.count >= (assessment.desd? ? 3 : 4)
    end

    grade
  end


  private def create_eidetic_questions!(assessment)

  end

  private def create_phonetic_questions!(assessment)

  end
end
