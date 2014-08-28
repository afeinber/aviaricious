Rails.application.routes.draw do
  devise_for :users

  resources :birds, only: [:index, :show] do
    resource :favorite, only: [:create, :destroy]
  end

  resources :scores, only: [:index, :create, :show]

  resources :favorites, only: :index

end
