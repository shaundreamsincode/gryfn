class Api::IntakeSpeechQuestionsController < ApplicationController
  # def index
  # end
  #
  def upsert_response
    question = IntakeSpeechQuestion.find_by!(token: params[:intake_speech_question_token])

    if params[:answer_file_path].nil?
      question.update!(answer: nil)
    else
      question.update!(answer: 'foobar')
    end

    render json: question
  end
end
