Rails.application.routes.draw do
  root 'pages#home'


  resources :registrations, only: :create

  namespace :api do
    resources :intake_assessments, only: :show, param: :token do
      get :summary
      get :send_summary_email
      get :speech_questions
      get :spelling_questions
    end

    resources :intake_speech_questions, only: [], param: :token do
      post :upsert_response
    end

    resources :intake_spelling_questions, only: [], param: :token do
      post :upsert_response
    end
  end

  get '/*path' => 'pages#home'
end
