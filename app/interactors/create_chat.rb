class CreateChat
  include Interactor

  def call
    chat = Chat.create!(language: context.language)
    initial_message_content = context.language == 'es' ? Prompts::INITIAL_ASSISTANT_PROMPT_ES :
                                Prompts::INITIAL_ASSISTANT_PROMPT_EN

    chat.messages.create!(content: system_prompt, role: 'system', is_prompt: true)
    chat.messages.create!(content: initial_message_content, role: 'assistant', is_prompt: true)

    context.chat = chat
  end

  private def system_prompt
    prompt = Prompts::INITIAL_SYSTEM_PROMPT

    if context.language == 'es'
      prompt += ". The patient speaks Spanish so make sure you only speak spanish to them."
    end

    prompt
  end
end
