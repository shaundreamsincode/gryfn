class UserOrganizationBadge < ApplicationRecord
  belongs_to :user
  belongs_to :organization_badge
end
