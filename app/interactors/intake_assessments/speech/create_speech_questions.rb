module IntakeAssessments
  module Speech
    class CreateSpeechQuestions
      include Interactor

      def call
        assessment = context.assessment

        if assessment.assessment_type == IntakeAssessment::ASSESSMENT_TYPES[:adt]
          context.questions = create_questions!(Data::Adt::WORDS_BY_LEVEL)
        else
          context.questions = create_questions!(Data::Desd::WORDS_BY_LEVEL)
        end
      end

      private def create_questions!(words_by_level_data)
        questions = []

        words_by_level_data.each_with_index do |words, level|
          words.each_with_index do |word, index|
            questions << IntakeSpeechQuestion.create!(
              correct_answer: word,
              index: index,
              assessment: context.assessment,
              level: level
            )
          end
        end

        questions

      end
    end
  end
end
