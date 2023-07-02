class GenerateChatSummary
  include Interactor

  def call
    chat = Chat.find_by!(token: context.chat_token)

    if chat.messages.length < 3
      context.summary = 'Patient did not interact with the chatbot.'
      return
    end

    messages_content = ''

    chat.messages.each do |message|
      next if message.system? || message.assistant?
      messages_content += "patient: #{message.content} \n"
    end

    content = "please summarize the chat in the format of a history of present illness with bullet points: #{messages_content}"

    client = OpenAI::Client.new(access_token: ENV['OPENAI_ACCESS_TOKEN'])

    response = client.chat(
      parameters: {
        model: "gpt-3.5-turbo",
        messages: [ { role: 'user', content: content } ],
        temperature: 0.1,
      }
    )

    context.summary = response.dig("choices", 0, "message", "content")
  end
end
