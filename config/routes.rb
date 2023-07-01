Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :chats, only: %i(index create)
      resources :users, only: %i(create)
      resources :sessions, only: %i(create)

      get 'verify_token', to: 'sessions#verify_token'
    end
  end

  # delete 'logout' => 'sessions#logout'

  root 'pages#home'

  # get 'signup' => 'pages#signup'
  # get 'login' => 'pages#login'
  get '/*path' => 'pages#home'
end
