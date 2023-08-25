class Api::IntakeSpeechQuestionsController < ApplicationController
  def upsert_response
    question = IntakeSpeechQuestion.find_by!(token: params[:intake_speech_question_token])
    audio_file = request.body.read

    result = DecodeSpeech.call(audio_file: audio_file)
    return render json: result.error, status: 422 if result.failure?

    question.update!(answer: result.transcript)
    render json: question
  end

  def reset_response
    question = IntakeSpeechQuestion.find_by!(token: params[:intake_speech_question_token])
    question.update!(answer: nil)

    render json: question
  end
end
