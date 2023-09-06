class Organization < ApplicationRecord
  has_secure_token

  has_many :intake_assessments
end
