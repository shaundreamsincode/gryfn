class GenerateChatSummary
  include Interactor

  def call
    chat = Chat.find_by!(token: context.chat_token)

    if chat.messages.length < 3
      context.summary = build_no_chat_interaction_message(chat)
      return
    end

    client = OpenAI::Client.new(access_token: ENV['OPENAI_ACCESS_TOKEN'])

    response = client.chat(
      parameters: {
        model: "gpt-3.5-turbo",
        messages: [ { role: 'user', content: build_summary_chat_prompt(chat) } ],
        temperature: 0.1,
      }
    )

    context.summary = response.dig("choices", 0, "message", "content")
  end

  private def build_summary_chat_prompt(chat)
    combined_msgs = combine_messages(chat)
    prompt = Prompts::SUMMARY_PROMPT
    prompt += ' Make sure to write this summary in Spanish.' if chat.language == 'es'
    prompt + " #{combined_msgs}"
  end

  private def combine_messages(chat)
    messages_content = ''

    chat.messages.each do |message|
      next if message.system?
      messages_content += "#{message.role === 'user' ?  'patient' : 'doctor'}: #{message.content} \n"
    end

    messages_content
  end

  private def build_no_chat_interaction_message(chat)
    chat.language == 'en' ? 'Patient did not interact with the chatbot.' : 'El paciente no interactuó con el chatbot.'
  end
end
