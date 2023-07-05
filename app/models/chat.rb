class Chat < ApplicationRecord
  has_secure_token
  enum language: { en: 0, es: 1 }

  belongs_to :user, optional: :true
  has_many :messages, dependent: :destroy

  def has_user_messages?
    messages.any? { |message| message.user? }
  end
end
