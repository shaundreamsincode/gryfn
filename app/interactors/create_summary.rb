class CreateSummary
  include Interactor

  def call
    client = OpenAI::Client.new(access_token: ENV['OPENAI_ACCESS_TOKEN'])

    response = client.chat(
      parameters: {
        model: "gpt-3.5-turbo",
        messages: [ { role: 'user', content: build_summary_chat_prompt } ],
        temperature: 0.1,
      }
    )

    summary_content = response.dig("choices", 0, "message", "content")
    summary = Summary.create!(chat: context.chat, content: summary_content)

    context.summary = summary
    context.updated_chat = context.chat.reload
  end

  private def build_summary_chat_prompt
    combined_msgs = combine_messages
    prompt = Prompts::SUMMARY_PROMPT
    prompt += ' Make sure to write this summary in Spanish.' if context.chat.language == 'es'
    prompt + " #{combined_msgs}"
  end

  private def combine_messages
    messages_content = ''

    context.chat.messages.each do |message|
      next if message.system?
      messages_content += "#{message.role === 'user' ?  'patient' : 'doctor'}: #{message.content} \n"
    end

    messages_content
  end
end
