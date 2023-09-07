module Api
  module IntakeAssessments
    class PracticeSpeechQuestionsController < ApplicationController
      def create
        audio_file = request.body.read
        decode_speech_result = DecodeSpeech.call(audio_file: audio_file)

        if decode_speech_result.error.present?
          return render json: { error: :decode_failed }, status: :unprocessable_entity
        end

        if decode_speech_result.transcript != 'map'
          return render json: {
            error: :incorrect_answer,
            decoded_answer: decode_speech_result.transcript
          }, status: :unprocessable_entity
        end

        render json: { user_answer: decode_speech_result.transcription }, status: :ok
      end
    end
  end
end
