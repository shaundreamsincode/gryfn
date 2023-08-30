module Api
  module IntakeAssessments
    class SpeechQuestionsController < ApplicationController
      def index
        intake_assessment = IntakeAssessment.find_by_token!(params[:intake_assessment_token])

        render json: intake_assessment.speech_questions.map do |question|
          {
            token: question.token,
            answer: question.answer,
            correct_answer: question.correct_answer,
            assessment_token: intake_assessment.token
          }
        end
      end

      def update
        question = IntakeSpeechQuestion.find_by_token!(params[:token])
        audio_file = request.body.read

        result = DecodeSpeech.call(audio_file: audio_file)
        return render json: result.error, status: 422 if result.failure?

        question.update!(answer: result.transcript)
        render json: question
      end

      def destroy
        question = IntakeSpeechQuestion.find_by_token!(params[:token])
        question.update!(answer: nil)

        render json: question
      end
    end
  end
end
