Rails.application.routes.draw do
  
 
  devise_for :users
  root "pages#home"
  resources :users, only: [:show]
  resources :collections, :words
end
