require 'rails_helper'

RSpec.describe Api::V1::ChatsController, type: :request do
  describe '#show' do
    it 'returns a serialized version of the chat' do
      chat = create(:chat)
      message = create(:message, chat: chat)

      # get "/api/v1/chats/#{chat.token}"

      # byebug
    end
  end
end