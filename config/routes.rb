Rails.application.routes.draw do
  root 'pages#home'

  namespace :unauthenticated do
    resources :intake_assessments, param: :token, only: :show do
      post :move_speech_assessment_to_next_level
      post :cancel
      post :move_to_next_step
      get :current_speech_question

      # todo - try refactoring using a namespace?
      resources :speech_questions, only: [:index, :update], param: :token, controller: 'intake_assessments/speech_questions'
      resources :practice_speech_questions, only: :create, param: :token, controller: 'intake_assessments/practice_speech_questions'
      resources :eidetic_questions, only: [:index, :update], param: :token, controller: 'intake_assessments/eidetic_questions'
      resources :phonetic_questions, only: [:index, :update], param: :token, controller: 'intake_assessments/phonetic_questions'
      resources :registrations, only: :create, param: :token, controller: 'intake_assessments/registrations'

      resources :summary, only: :index, controller: 'intake_assessments/summary'
      resources :send_summary_email, only: :index, controller: 'intake_assessments/send_summary_email'
    end
  end

  namespace :api do
    resources :sessions, only: :create
    resources :verify_jwt, only: :index
    resources :logout, only: :create

    resources :current_account, only: :index
    get :current_account_intake_assessments, to: 'current_account#intake_assessments'
    put :current_account_password, to: 'current_account#update_password'
    put :current_account_basic_info, to: 'current_account#update_basic_info'
    post :current_account_create_intake_assessment, to: 'current_account#create_intake_assessment'

    resources :intake_assessments, param: :token, only: :show do
      post :cancel
    end
  end

  get '/*path' => 'pages#home'
end
