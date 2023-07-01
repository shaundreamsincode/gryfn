module Api
  module V1
    class UsersController < ApiController
      # def create
      #   puts "params: #{params.inspect}"
      #   puts "~~"
      #   user = User.new(
      #     first_name: params[:firstName],
      #     last_name: params[:lastName],
      #     email: params[:email],
      #     password: params[:password],
      #     password_confirmation: params[:passwordConfirmation]
      #   )
      #
      #   user.save!
      #
      #   token = user.generate_jwt
      #   render json: { token: token }
      #
      #   # if user.save!
      #   #   render json user
      #   # else
      #   #   # flash[:alert] = "There was an error with signing up."
      #   #   # render :new
      #   # end
      # end
      #
      # private
      #
      # def user_params
      #   params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
      # end
    end
  end
end
