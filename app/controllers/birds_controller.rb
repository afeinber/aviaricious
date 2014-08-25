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
    render json: Bird.find_by(scientific_name: params[:id]).to_json
  end
end
