Rails.application.routes.draw do
 
  resources :users, only: [:new, :create]
  
  resource :session, only: [:new, :create, :destroy]
  
  namespace :api do 
    resources :prescriptions, only: [:index, :show, :create, :update, :destroy]
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create]
  end
  
  get '/api/session', to: 'api/sessions#status'

root 'main#home'

end
