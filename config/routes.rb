Rails.application.routes.draw do
  root 'pages#home'


  resources :registrations, only: :create

  namespace :api do
    get '/intake_assessment/:account_token', to: 'intake_assessment#show'
  end

  get '/*path' => 'pages#home'
end
