class CreateChat
  include Interactor

  def call
    chat = Chat.create!(language: context.language)

    chat.messages.create!(content: system_prompt, role: 'system')
    chat.messages.create!(content: initial_message_content, role: 'assistant')

    context.chat = chat
  end

  private def system_prompt
    prompt = Prompts::INITIAL_PROMPT

    if context.language == 'es'
      prompt += ". The patient speaks Spanish so make sure you only speak spanish to them."
    end

    prompt
  end

  private def initial_message_content
    if context.language == 'es'
      return "¡Hola! Soy un médico asistido por IA que está aquí para ayudarte. ¿Cómo puedo ayudarle hoy?"
    end

    "Hello! I'm an AI-assisted doctor here to help you. How can I assist you today?"
  end
end
