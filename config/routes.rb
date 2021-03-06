Rails.application.routes.draw do
  devise_for :users, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks',
    registrations: 'users/registrations'
  }
  root "groups#index"
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create] do
      resources :likes, only: [:create, :destroy]
    end
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end    
end
