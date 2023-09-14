module IntakeAssessments
  class CreatePhoneticQuestions
    include Interactor

    def call
      assessment = context.assessment

      first_wrong_question_on_last_attempted_row_index = assessment.speech_questions_on_current_level
                                                                       .reject {|q| q.is_correct? }
                                                                       .first
                                                                       .index

      words = []

      (first_wrong_question_on_last_attempted_row_index..assessment.speech_questions.length - 1).each do |index|
        question = assessment.speech_questions.find_by(index: index)

        if !question.is_correct? || !question.answer
          words << question.correct_answer
        end
      end

      list_length = assessment.desd? ? 5 : 7
      context.phonetic_questions = create_phonetic_questions!(words[0..list_length-1], assessment)
    end

    private def create_phonetic_questions!(words, assessment)
      questions = []

      words.each_with_index do |word, index|
        questions << IntakePhoneticQuestion.create!(
          assessment: assessment,
          correct_answer: word,
          file_name: "#{word}.mp3",
          level: 0, # TODO - remove/dont use this
          index: index,
          phonetic_sets: Data::PhoneticDictionary::DICTIONARY[word]
        )

        questions
      end
    end
  end
end
