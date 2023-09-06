module Api
  class AccountSettingsController
    def index
      render json: { first_name: first_name, last_name: last_name, email: email }
    end

    def update
    end
  end
end
