class Api::IntakeQuestionsController < ApplicationController
  def upsert_response
    question = IntakeQuestion.find_by!(token: params[:intake_question_token])
    question.update!(answer: params[:answer])

    render json: question
  end
end
