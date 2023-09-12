module Unauthenticated
  module IntakeAssessments
    class SpeechQuestionsController < UnauthenticatedController
      def index
        intake_assessment = IntakeAssessment.find_by_token!(params[:intake_assessment_token])
        level = intake_assessment.speech_assessment_current_level
        questions_scoped_by_level = intake_assessment.speech_questions.where(level: level).order(:index)

        json = questions_scoped_by_level.map do |question|
          {
            token: question.token,
            answer: question.answer,
            correct_answer: question.correct_answer,
            assessment_token: intake_assessment.token,
            answer_viewable: intake_assessment.email == 'test@gryfn.ai'
          }
        end

        render json: json
      end

      def update
        question = IntakeSpeechQuestion.find_by_token!(params[:token])

        result = ::IntakeAssessments::Speech::AnswerSpeechQuestion.call(
          question: question,
          audio_file: request.body.read
        )

        render json: result.question
      end
    end
  end
end
