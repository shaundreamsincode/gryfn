class Message < ApplicationRecord
  belongs_to :chat
  # message = Message.new
  # message.chat
end
