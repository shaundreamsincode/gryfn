class CreateMessage
  include Interactor

  def call
    ActiveRecord::Base.transaction do
      chat = Chat.find_by!(token: context.chat_token)

      user_message = chat.messages.create(
        content: context.message_content,
        role: :user
      )

      mapped_messages = chat.messages.map do |msg|
        { role: msg.role, content: msg.content }
      end

      client = OpenAI::Client.new(access_token: ENV['OPENAI_ACCESS_TOKEN'])

      response = client.chat(
        parameters: {
          model: "gpt-3.5-turbo",
          messages: mapped_messages,
          temperature: 0.1
        }
      )

      assistant_message = chat.messages.create(
        role: "assistant",
        content: response.dig("choices", 0, "message", "content")
      )

      context.user_message = user_message
      context.assistant_message = assistant_message

      true
    end
  end
end
