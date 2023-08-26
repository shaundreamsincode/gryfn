Rails.application.routes.draw do
  root 'pages#home'


  resources :registrations, only: :create

  namespace :api do
    resources :intake_assessments, only: :show, param: :token do
      get :summary
      get :send_summary_email
      get :spelling_questions
      get :speech_questions

      get :move_to_next_step # TODO - MAKE THIS A POST!
    end

    resources :intake_speech_questions, only: [], param: :token do
      post :upsert_response
      post :reset_response
    end

    resources :intake_spelling_questions, only: [], param: :token do
      post :upsert_response
    end
  end

  get '/*path' => 'pages#home'
end
