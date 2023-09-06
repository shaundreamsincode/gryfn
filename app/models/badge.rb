class Badge < ApplicationRecord
  has_secure_token

  belongs_to :account
  belongs_to :organization

  enum role: { member: 0, admin: 1 }
end
