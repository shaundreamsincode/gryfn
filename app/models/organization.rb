class Organization < ApplicationRecord
  has_secure_token

  has_many :intake_assessments
  has_many :badges
  has_many :accounts, through: :badges
end
