module IntakeAssessments
  class CreateEideticQuestions
    include Interactor

    def call
      _assessment = context.assessment
      speech_score = _assessment.speech_score # 0
      correct_questions_on_score_level = _assessment.speech_questions_by_level(speech_score).select { |q| q.is_correct? }
      last_correct_question_on_score_level = correct_questions_on_score_level.last

      correct_words = [last_correct_question_on_score_level.answer]

      (last_correct_question_on_score_level.index).times.reverse_each do |index|
        ith_question = _assessment.speech_questions.find_by(index: index)
        correct_words << ith_question.answer if ith_question.is_correct?
      end

      list_length = _assessment.desd? ? 5 : 7
      context.eidetic_questions = create_eidetic_questions!(correct_words[0..list_length - 1], _assessment)
    end

    private def create_eidetic_questions!(words, assessment)
      questions = []

      words.each_with_index do |word, index|
        questions << IntakeEideticQuestion.create!(
          assessment: assessment,
          correct_answer: word,
          file_name: "#{word}.mp3",
          level: 0, # TODO - remove/dont use this
          index: index
        )

        questions
      end
    end
  end
end
