Rails.application.routes.draw do
  root 'pages#home'

  resources :registrations, only: :create

  namespace :api do
    resources :sessions, only: :create
    resources :verify_jwt, only: :index
    resources :logout, only: :create

    resources :current_account, only: :index
    put :current_account, to: 'current_account#update'

    resources :intake_assessments, only: :show, param: :token do
      post :move_speech_assessment_to_next_level
      get :current_speech_question

      resources :speech_questions, only: [:index, :update], param: :token, controller: 'intake_assessments/speech_questions'
      resources :eidetic_questions, only: [:index, :update], param: :token, controller: 'intake_assessments/eidetic_questions'
      resources :phonetic_questions, only: [:index, :update], param: :token, controller: 'intake_assessments/phonetic_questions'

      resources :summary, only: :index, controller: 'intake_assessments/summary'
      resources :send_summary_email, only: :index, controller: 'intake_assessments/send_summary_email'
    end
  end

  get '/*path' => 'pages#home'
end
