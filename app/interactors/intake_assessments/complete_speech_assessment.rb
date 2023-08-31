class IntakeAssessments::CompleteSpeechAssessment
  include Interactor

  def call
    # todo - put validations?
    grade = calculate_grade

    create_eidetic_questions!(grade)
    create_phonetic_questions!
    context.assessment.update!(speech_assessment_grade_level: grade)

    IntakeAssessments::MoveToNextStep.call(assessment: context.assessment)
    context.assessment.reload
  end

  # should return an integer
  private def calculate_grade
    grade = 0

    context.assessment.level_count.times do |level|
      correct_at_level = IntakeSpeechQuestion.where(
        intake_assessment: context.assessment,
        level: level
      ).select { |question| question.is_correct? }

      grade = level if correct_at_level.count > 2
    end

    grade
  end

  private def create_eidetic_questions!(grade)
    questions = []

    level = grade + 1
    words = context.assessment.words_by_level(level)

    words.each_with_index do |word, index|
      questions << IntakeEideticQuestion.create!(
        correct_answer: word,
        file_name: "#{word}.mp3",
        index: index,
        intake_assessment: context.assessment
      )
    end

    questions
  end

  private def create_phonetic_questions!
    # we need to find the first incorrect answer at or below this row. the row of this incorrect answer
    # will be the level used.

    questions = []
    level = 0

    context.assessment.level_count.times do |_level|
      questions_at_level = IntakeSpeechQuestion.where(intake_assessment: context.assessment, level: _level)
      break unless questions_at_level.all? { |question| question.answer.present? }

      incorrect_at_level = questions_at_level.reject { |question| question.is_correct? }
      level = _level unless incorrect_at_level.count === 0
    end

    puts "phonetic level #{level}"

    words = context.assessment.words_by_level(level)

    words.each_with_index do |word, index|
      questions << IntakePhoneticQuestion.create!(
        correct_answer: word,
        file_name: "#{word}.mp3",
        index: index,
        intake_assessment: context.assessment,
        phonetic_sets: IntakePhoneticQuestion::EXAMPLE_PHONETIC_SETS_DICTIONARY[word]
      )
    end

    questions
  end
end
