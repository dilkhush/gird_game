GridGame::Application.routes.draw do
  resources :games do
    collection do
      get 'home', 'get_view', 'select_blocks'
    end
  end
  root :to => 'games#home'
end
