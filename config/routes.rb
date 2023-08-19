Rails.application.routes.draw do
  root 'pages#home'


  resources :registrations, only: :create

  namespace :api do
    resources :intake_assessments, only: [:show, :update], param: :token
  end

  get '/*path' => 'pages#home'
end
