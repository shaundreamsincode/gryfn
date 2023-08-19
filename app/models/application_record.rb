class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
  has_secure_token
end
