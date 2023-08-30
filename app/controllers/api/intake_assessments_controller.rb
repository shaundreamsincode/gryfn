class Api::IntakeAssessmentsController < ApplicationController
  def show
    intake_assessment = IntakeAssessment.find_by!(token: params[:token])

    render json: {
      token: intake_assessment.token,
      current_step: intake_assessment.current_step
    }
  end

  # /api/intake_questions/:intake_question_token/summary
  def summary
    assessment = IntakeAssessment.find_by!(token: params[:intake_assessment_token])
    render json: map_summary(assessment)
  end

  # /api/intake_assessments/:intake_assessment_token/send_summary_email
  def send_summary_email
    assessment = IntakeAssessment.find_by!(token: params[:intake_assessment_token])

    SummaryMailer.summary_email(assessment).deliver_now
    head 200
  end

  def move_to_next_step
    assessment = IntakeAssessment.find_by!(token: params[:intake_assessment_token])

    # TODO - fix this

    if assessment.speech?
      assessment.eidetic!
    elsif assessment.eidetic?
      assessment.phonetic!
    elsif assessment.phonetic?
      assessment.summary!
    end

    render json: assessment

    # next_step = assessment.current_step.to_i + 1
    # assessment.update!(current_step: next_step)
    #
    # render json: assessment
  end

  private def map_summary(intake_assessment)
    {
      speech_questions: map_summary_questions(intake_assessment.speech_questions),
      eidetic_questions: map_summary_questions(intake_assessment.eidetic_questions),
      phonetic_questions: map_summary_questions(intake_assessment.phonetic_questions)
    }
  end

  private def map_summary_questions(questions)
    questions.map do |question|
      {
        token: question.token,
        answer: question.answer,
        correct_answer: question.correct_answer,
        is_correct: question.is_correct?
      }
    end
  end
end
