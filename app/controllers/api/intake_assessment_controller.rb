class Api::IntakeAssessmentController < ApplicationController
  def show
    account = Account.find_by!(token: params[:account_token])
    intake_assessment = account.intake_assessment

    if intake_assessment.intake_survey_response.blank?
      return render json: { currentQuestionType: :survey }
    end

    audio_question = intake_assessment.current_audio_question

    render json: { currentQuestionType: :audio, currentAudioQuestion: {
      token: audio_question.token, fileName: audio_question.file_name, questionType: audio_question.question_type }
    }
  end
end
