module Api
  module V1
    class ChatsController < ApiController
      PROMPT = "I want you to act as an AI assisting a doctor.  You will gather the history of present illness from the patient. This includes asking the patient more about their symptoms and medical conditions to better understand their problems. Only ask one question at a time and let the patient answer before asking another question. Ask as many clarifying questions as you can. DO NOT OFFER MEDICAL ADVICE."

      def show
        chat = Chat.find_by(token: params[:token])

        if chat.nil?
          render json: { error: "Chat not found" }, status: :not_found
        else
          # todo - possibly filter out system messages here...?
          render json: chat.to_json(include: [:messages])
        end
      end

      def create
        chat = Chat.create!

        chat.messages.create(content: PROMPT, role: 'system')
        chat.messages.create(content: "Hello! I'm an AI-assisted doctor here to help you. How can I assist you today?", role: 'assistant')

        render json: chat.to_json(include: [:messages])
      end
    end
  end
end
