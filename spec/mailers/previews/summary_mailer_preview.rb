# test/mailers/previews/summary_mailer_preview.rb

class SummaryMailerPreview < ActionMailer::Preview
  def summary_email
    # Create a dummy chat and summary for preview purposes
    chat = Chat.new(token: "example_chat_token")
    summary = Summary.new(token: "example_summary_token", content: "This is a summary content.\n\nMore details here.")

    email = "shauncarland@gmail.com"

    # Call the mailer action with the dummy data
    SummaryMailer.summary_email(email, Summary.last.content)
  end
end
