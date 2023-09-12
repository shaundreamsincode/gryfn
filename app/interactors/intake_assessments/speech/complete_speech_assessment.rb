class IntakeAssessments::Speech::CompleteSpeechAssessment
  include Interactor

  def call
    _assessment = context.assessment
    validate_assessment!(_assessment)
    return if context.errors.present?

    grade = calculate_grade
    create_eidetic_questions!(grade)
    create_phonetic_questions!

    context.assessment.update!(
      speech_assessment_grade_level: grade,
      eidetic_assessment_level: grade + 1,
      phonetic_assessment_level: calculate_phonetic_question_level,
      completed_at: Time.zone.now
    )

    IntakeAssessments::MoveToNextStep.call(assessment: context.assessment)
    context.assessment.reload
  end

  private def validate_assessment!(_assessment)
    correct_question_count = _assessment.correct_speech_questions.count
    incorrect_question_count = _assessment.incorrect_speech_questions.count

    # byebug
    if _assessment.required_correct_speech_questions_count > correct_question_count
      _assessment.update!(current_step: 'fail_insufficient_correct')
      context.error = 'insufficient_correct'
    end

    if _assessment.required_incorrect_questions_count > incorrect_question_count
      _assessment.update!(current_step: 'fail_insufficient_incorrect')
      context.error = 'insufficient_incorrect'
    end
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
        level: level,
        intake_assessment: context.assessment
      )
    end

    questions
  end

  private def calculate_phonetic_question_level
    return @_calculate_phonetic_question_level if @_calculate_phonetic_question_level.present?

    @_calculate_phonetic_question_level = 0

    context.assessment.level_count.times do |_level|
      questions_at_level = IntakeSpeechQuestion.where(intake_assessment: context.assessment, level: _level)
      break unless questions_at_level.all? { |question| question.answer.present? }

      incorrect_at_level = questions_at_level.reject { |question| question.is_correct? }
      @_calculate_phonetic_question_level = _level unless incorrect_at_level.count === 0
    end

    @_calculate_phonetic_question_level ||= level
  end

  private def create_phonetic_questions!
    # we need to find the first incorrect answer at or below this row. the row of this incorrect answer
    # will be the level used.

    questions = []
    level = calculate_phonetic_question_level
    words = context.assessment.words_by_level(level)

    words.each_with_index do |word, index|
      questions << IntakePhoneticQuestion.create!(
        correct_answer: word,
        file_name: "#{word}.mp3",
        index: index,
        intake_assessment: context.assessment,
        level: level,
        phonetic_sets: Data::PhoneticDictionary::DICTIONARY[word]
      )
    end

    questions
  end
end
