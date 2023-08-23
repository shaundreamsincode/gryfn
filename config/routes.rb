Rails.application.routes.draw do
  root 'pages#home'


  resources :registrations, only: :create

  namespace :api do
    resources :intake_assessments, only: :show, param: :token do
      get :summary
      get :send_summary_email
    end

    resources :intake_eidetic_questions, only: [], param: :token do
      post :upsert_response
    end
  end

  get '/*path' => 'pages#home'
end
