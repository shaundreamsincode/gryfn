class SendSummaryEmail
  include Interactor
  EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  def call
    chat = Chat.find_by!(token: context.chat_token)
    summary = Summary.find_by!(token: context.summary_token, chat: chat)

    unless EMAIL_REGEX.match?(context.doctor_email) && EMAIL_REGEX.match?(context.patient_email)
      context.error = :invalid_email
      return
    end


    # send an email to the doctor
    SummaryMailer.summary_email(
      doctor_email: context.doctor_email,
      patient_email: context.patient_email,
      name: context.name,
      date_of_birth: context.date_of_birth,
      summary_content: summary.content
    ).deliver_now

    # byebug
    # send an email to the patient
    PatientSummaryMailer.patient_summary_email(
      patient_email: context.patient_email,
      doctor_email: context.doctor_email,
      name: context.name,
      date_of_birth: context.date_of_birth,
      summary_content: summary.content
    ).deliver_now

    context.summary = summary

    Event.create!(name: 'summary_email_sent')

    true
  end
end
