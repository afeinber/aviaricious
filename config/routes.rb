Rails.application.routes.draw do
  devise_for :users

  resources :birds, only: [:index, :show]
end
