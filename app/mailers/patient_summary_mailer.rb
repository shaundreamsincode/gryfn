class PatientSummaryMailer < ApplicationMailer
  def patient_summary_email(patient_email:, doctor_email:, name:, date_of_birth:, summary_content:)
    @patient_email = patient_email
    @doctor_email = doctor_email
    @name = name
    @date_of_birth = date_of_birth
    @patient_email = patient_email
    @summary_content = summary_content

    mail(
      to: @patient_email,
      subject: 'Summary generated from DocBot',
      from: 'docbot@docbot.tech',
      message_stream: 'broadcast'
    )
  end
end