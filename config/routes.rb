Rails.application.routes.draw do
  root 'pages#home'
  get '/*path' => 'pages#home'

  resources :registrations, only: :create
end
