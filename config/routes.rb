Rails.application.routes.draw do
  root 'pages#home'
  get '/*path' => 'pages#home'
end
