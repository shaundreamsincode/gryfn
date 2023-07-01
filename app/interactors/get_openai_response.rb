# class GetOpenaiResponse
#   include Interactor
#
#   def call
#     mapped_messages = context.chat.messages.map do |msg|
#       { role: msg.role, content: msg.content }
#     end
#
#     client = OpenAI::Client.new(access_token: ENV['OPENAI_ACCESS_TOKEN'])
#
#     response = client.chat(
#       parameters: {
#         model: "gpt-3.5-turbo",
#         messages: mapped_messages,
#         temperature: 0.1
#       }
#     )
#
#
#   end
# end
#
# # chat_token: params[:chat_token],
# #   message_content: message_params[:message_content]
