module IntakeAssessments
  module Speech
    class AnswerSpeechQuestion
      include Interactor

      def call
        question = context.question

        result = DecodeSpeech.call(audio_file: context.audio_file)

        if result.failure?
          question.update!(answer: 'FAILURE')
        else
          question.update!(answer: result.transcript)
        end

        assessment = question.assessment
        assessment.speech_question_index += 1
        assessment.save!

        questions_answered = assessment.speech_questions.where.not(answer: nil).where(level: assessment.speech_current_level)

        if questions_answered.length === 5
          IntakeAssessments::Speech::MoveToNextSpeechLevel.call(assessment: assessment)
        end

        context.question = question.reload
      end
    end
  end
end
