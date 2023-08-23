class Api::IntakeSpeechQuestionsController < ApplicationController
  def upsert_response
    question = IntakeSpeechQuestion.find_by!(token: params[:intake_speech_question_token])

    puts "params #{params}"
    # question.update!(answer: params[:answer])

    render json: question
  end
end
