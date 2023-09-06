class Deity < ApplicationRecord
  has_secure_token
  has_secure_password
end
