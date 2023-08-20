# test/mailers/previews/summary_mailer_preview.rb

class SummaryMailerPreview < ActionMailer::Preview
  def summary_email
    intake_assessment = IntakeAssessment.last

    # @email = intake_assessment.email
    SummaryMailer.summary_email(intake_assessment)
  end
end
