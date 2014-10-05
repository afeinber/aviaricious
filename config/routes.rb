Rails.application.routes.draw do

  devise_for :users, controllers: { sessions: "users/sessions", registrations: "users/registrations" }

  resources :birds, only: [:index, :show] do
    resource :favorite, only: [:create, :destroy]
  end

  resources :scores, only: [:index, :create, :show]

  resources :favorites, only: :index

end
