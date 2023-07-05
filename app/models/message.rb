class Message < ApplicationRecord
  has_secure_token

  enum role: { system: 0, assistant: 1, user: 2 }
  belongs_to :chat
end
