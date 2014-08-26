class BirdsController < ApplicationController
  # respond_to :json

  def index
    #cache this forever since it will never change
    # unless params['search'].present?
    bird_json = Rails.cache.fetch('birds', expires_in: 10.days) do
      Bird.all.to_json
    end
    render json: bird_json
    # else
      # render json: Bird.search(params['search'], params['name']).to_json
    # end
  end

  def show
    @bird = Bird.find_by(scientific_name: params[:id])

    is_favorite = current_user.favorites.exists?(bird: @bird)

    render json: { bird: @bird, favorite: is_favorite }
  end
end
