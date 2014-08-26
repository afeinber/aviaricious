Rails.application.routes.draw do
  devise_for :users

  resources :birds, only: [:index, :show] do
    resource :favorite, only: [:create, :destroy]
  end

  resources :favorites, only: :index

end
