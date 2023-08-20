class Api::IntakeQuestionsController < ApplicationController
  def upsert_response
    # intake_question_token

    # todo - change to student_answer/actual_answer?
    question = IntakeQuestion.find_by!(token: params[:intake_question_token])
    # question
  end
end
