Rails.application.routes.draw do
  root 'pages#home'

  namespace :api do
    namespace :v1 do
      resources :incidents, only: :index
      resources :slash_commands, only: :create
    end
  end
end
