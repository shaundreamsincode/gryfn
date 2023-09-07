class Intake::IntakeController < ApplicationController
  skip_before_action :verify_authenticity_token
end
