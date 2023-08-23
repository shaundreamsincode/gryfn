class Api::IntakeSpellingQuestionsController < ApplicationController
  def upsert_response
    question = IntakeSpellingQuestion.find_by!(token: params[:intake_spelling_question_token])
    question.update!(answer: params[:answer])

    render json: question
  end
end
