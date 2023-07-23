class SummaryMailer < ApplicationMailer
  def summary_email(email:, name:, birthday:, patient_email:, summary_content:)
    @email = email
    @name = name
    @birthday = birthday
    @patient_email = patient_email
    @summary_content = summary_content

    mail(
      to: @email,
      subject: 'Summary generated from DocBot',
      from: 'docbot@docbot.tech',
      message_stream: 'broadcast'
    )
  end
end
