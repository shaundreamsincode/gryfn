class User < ApplicationRecord
  has_secure_password
  validates :password, presence: true, on: :create

  def generate_jwt
    JWT.encode({ id: id, email: email }, Rails.application.secrets.secret_key_base, 'HS256')
  end

  def self.from_token(token)
    decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
    find(decoded_token.first['id'])
  rescue JWT::DecodeError
    nil
  end
end
