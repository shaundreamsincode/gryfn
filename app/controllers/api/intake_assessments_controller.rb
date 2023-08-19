class Api::IntakeAssessmentsController < ActionController::Base
  def show
    puts "params #{params}"
    intake_assessment = IntakeAssessment.find_by!(token: params[:token])
    render json: intake_assessment
  end

  def update
    # used to respond to survey questions
  end
end
