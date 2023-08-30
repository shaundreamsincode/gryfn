Rails.application.routes.draw do
  root 'pages#home'


  resources :registrations, only: :create

  namespace :api do
    resources :intake_assessments, only: :show, param: :token do
      post :move_to_next_step

      resources :speech_questions, only: :index, controller: 'intake_assessments/speech_questions'
      resources :eidetic_questions, only: :index, controller: 'intake_assessments/eidetic_questions'
      resources :phonetic_questions, only: :index, controller: 'intake_assessments/phonetic_questions'

      resources :summary, only: :index, controller: 'intake_assessments/summary'
      resources :send_summary_email, only: :index, controller: 'intake_assessments/send_summary_email'
    end

    resources :intake_speech_questions, only: [], param: :token do
      post :upsert_response
      post :reset_response
    end

    resources :intake_eidetic_questions, only: [], param: :token do
      post :upsert_response
    end

    resources :intake_phonetic_questions, only: [], param: :token do
      post :upsert_response
    end
  end

  get '/*path' => 'pages#home'
end
