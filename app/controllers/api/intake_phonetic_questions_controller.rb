class Api::IntakePhoneticQuestionsController < ApplicationController
  def upsert_response
    question = IntakePhoneticQuestion.find_by!(token: params[:intake_phonetic_question_token])

    question.update!(answer: params[:answer])

    render json: question
  end
end
