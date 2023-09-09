module Api
  class CurrentAccountController < ApiController
    def index
      render json: @current_account.hashify
    end

    def intake_assessments
      return render head: 404 if @current_account.blank?

      render json: @current_account.intake_assessments.map(&:hashify)
    end

    def update_basic_info
      return render head: 404 if @current_account.blank?

      unless basic_info_params[:email].match(/\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i)
        return render json: { error: 'Email format is invalid.' }, status: :unprocessable_entity
      end

      @current_account.update!(
        first_name: basic_info_params[:first_name],
        last_name: basic_info_params[:last_name],
        email: basic_info_params[:email]
      )

      render json: @current_account
    end

    def update_password
      return render head: 404 if @current_account.blank?

      unless @current_account.authenticate(password_params[:current_password])
        return render json: { error: 'Current password is incorrect.' }, status: :unprocessable_entity
      end

      if password_params[:password] != password_params[:password_confirmation]
        return render json: { error: 'Password confirmation does not match password.' }, status: :unprocessable_entity
      end

      if password_params[:password].length < 8 || password_params[:password_confirmation].length < 8
        return render json: { error: 'Password must be at least 8 characters long.' }, status: :unprocessable_entity
      end

      @current_account.update!(
        password: password_params[:password],
        password_confirmation:
          password_params[:password_confirmation]
      )

      render json: {}, status: :ok
    end

    def create_intake_assessment
      return render head: 404 if @current_account.blank?

      intake_assessment = ::IntakeAssessments::CreateIntakeAssessment.call(
        account: @current_account,
        patient_first_name: intake_assessment_params[:first_name],
        email: intake_assessment_params[:email]
        ).intake_assessment

      render json: intake_assessment.hashify
    end

    private def basic_info_params
      params.permit(:first_name, :last_name, :email).to_h
    end

    private def password_params
      params.permit(:password, :password_confirmation, :current_password)
    end

    private def intake_assessment_params
      params.permit(:first_name, :email)
    end
  end
end
