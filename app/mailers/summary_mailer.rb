class SummaryMailer < ApplicationMailer
  def summary_email(assessment)
    @email = assessment.email

    mail(
      to: @email,
      subject: 'Test results from Gryfn',
      from: 'docbot@docbot.tech',
      message_stream: 'broadcast'
    )
  end
end
