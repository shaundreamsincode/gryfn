module Api
  class ApiController < ApplicationController
    # We skip checking for CSRF attacks because we are using JWT authentication.
    skip_before_action :verify_authenticity_token
  end
end
