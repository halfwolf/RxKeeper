Rails.application.routes.draw do

  resources :users, only: [:new, :create]
  
  resources :session, only: [:new, :create, :destroy]
  
  namespace :api do 
    resources :prescriptions, only: [:index, :show, :create, :update, :destroy]
  end

end
