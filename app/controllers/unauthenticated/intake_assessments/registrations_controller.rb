module Unauthenticated
  module IntakeAssessments
    class RegistrationsController < UnauthenticatedController
      def create
        intake_assessment = IntakeAssessment.find_by!(token: params[:intake_assessment_token])

        result = ::IntakeAssessments::PerformRegistration.call(
          intake_assessment: intake_assessment,
          date_of_birth: Date.parse(params[:date_of_birth]),
          country: params[:country],
          zip_code: params[:zip_code],
          previously_diagnosed: params[:previously_diagnosed],
          level_of_education: params[:level_of_education],
          )

        render json: { intakeAssessmentToken: result.intake_assessment.token }
      end
    end
  end
end
