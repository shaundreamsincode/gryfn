class Account < ApplicationRecord
  has_secure_token
  has_secure_password

  has_many :intake_assessments, foreign_key: :created_by_id
  has_many :badges

  def organization
    badges.first.organization
  end

  def hashify
    {
      first_name: first_name,
      last_name: last_name,
      email: email,
      token: token
    }
  end

  def generate_jwt
    JWT.encode({ id: id, email: email }, ENV['SECRET_KEY_BASE'], 'HS256')
  end

  def self.from_jwt_token(token)
    decoded_token = JWT.decode(token, ENV['SECRET_KEY_BASE'], true, algorithm: 'HS256')
    find(decoded_token.first['id'])
  rescue JWT::DecodeError
    nil
  end
end
