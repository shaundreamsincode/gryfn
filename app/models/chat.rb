class Chat < ApplicationRecord
  belongs_to :user
  has_many :messages
end
# chat = Chat.new
# chat.messages