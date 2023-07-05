class User < ApplicationRecord
  has_secure_password
  has_secure_token

  validates :password, presence: true, on: :create

  has_many :chats

  def generate_jwt
    JWT.encode({ id: id, email: email }, ENV['SECRET_KEY_BASE'], 'HS256')
  end

  def self.from_token(token)
    decoded_token = JWT.decode(token, ENV['SECRET_KEY_BASE'], true, algorithm: 'HS256')
    find(decoded_token.first['id'])
  rescue JWT::DecodeError
    nil
  end
end
