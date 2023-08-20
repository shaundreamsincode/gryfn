Rails.application.routes.draw do
  root 'pages#home'


  resources :registrations, only: :create

  namespace :api do
    resources :intake_assessments, only: [:show, :update], param: :token

    resources :intake_questions, only: [], param: :token do
      post :upsert_response, to: :upsert_response
    end

    # post 'upsert_response',to: 'intake_assessments#upsert_response'
  end

  get '/*path' => 'pages#home'
end
