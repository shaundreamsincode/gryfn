Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :chats, only: [], param: :token do
        resources :messages, only: %i(create)
        resources :summaries, only: %i(create)

        collection do
          post '', action: :create
        end

        member do
          get '', action: :show
        end
      end

      # resources :users, only: %i(create)
      # resources :sessions, only: %i(create)

      post 'chats/:token/close', to: 'chats#close'
      get 'verify_token', to: 'sessions#verify_token'
    end
  end

  # delete 'logout' => 'sessions#logout'

  root 'pages#home'

  # get 'signup' => 'pages#signup'
  # get 'login' => 'pages#login'
  get '/*path' => 'pages#home'
end
