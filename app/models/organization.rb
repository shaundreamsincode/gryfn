class Organization < ApplicationRecord
  has_secure_token
  has_many :organization_badges
end
