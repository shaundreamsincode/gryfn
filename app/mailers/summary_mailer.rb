class SummaryMailer < ApplicationMailer
  def summary_email(email, summary_content)
    @email = email
    @summary_content = summary_content

    mail(
      to: @email,
      subject: 'Summary generated from DocBot',
      from: 'docbot@docbot.tech',
      message_stream: 'broadcast'
    )
  end
end