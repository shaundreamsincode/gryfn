module Api
  module IntakeAssessments
    class SendSummaryEmailController < ApplicationController

      # todo - switch to POST?
      def index
        assessment = IntakeAssessment.find_by!(token: params[:intake_assessment_token])
        SummaryMailer.summary_email(assessment).deliver_now

        head 200
      end
    end
  end
end
