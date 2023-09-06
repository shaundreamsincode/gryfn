class OnboardOrganization
  include Interactor

  def call
    create_organization
    create_account
  end

  private

  def create_organization
    organization_name = context.organization_name

    if Organization.exists?(name: organization_name)
      context.errors = [:name_already_taken]
    else
      organization = Organization.create!(name: organization_name)
      context.organization = organization
    end
  rescue ActiveRecord::RecordInvalid => e
    context.errors = [e.message]
  end

  def create_account
    account_attrs = {
      first_name: context.account_first_name,
      last_name: context.account_last_name,
      email: context.account_email,
      password: context.account_password,
      password_confirmation: context.account_password_confirmation
    }

    account = Account.new(account_attrs)

    if account.save
      Badge.create!(organization: context.organization, account: account, role: :admin)
      context.account = account
    else
      context.errors = account.errors.full_messages
    end
  end
end
