class SendSummaryEmail
  include Interactor
  EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  def call
    chat = Chat.find_by!(token: context.chat_token)

    summary = Summary.find_by!(
      token: context.summary_token,
      chat: chat
    )

    unless EMAIL_REGEX.match?(context.email)
      context.error = :invalid_email
      return
    end

    SummaryMailer.summary_email(context.email, summary).deliver_now
    context.summary = summary

    true
  end
end