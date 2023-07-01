Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :chats, only: [:index]
    end
  end

  root 'pages#home'
  get '/*path' => 'pages#home'
end
