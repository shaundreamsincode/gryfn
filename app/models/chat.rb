class Chat < ApplicationRecord
  has_secure_token

  belongs_to :user, optional: :true
  has_many :messages
end
