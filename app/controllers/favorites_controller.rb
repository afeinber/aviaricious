class FavoritesController < ApplicationController
  respond_to :json


  def create
    favorite = current_user.favorites.new
    favorite.bird = Bird.find_by(scientific_name: params[:bird_id])
    favorite.save
    respond_with [favorite.bird, favorite]
  end

  def destroy
    favorite = current_user.favorites.find_by(bird: params[:bird_id])
    respond_with favorite.destroy
  end

  def index
    respond_with current_user.favorites.includes(:bird).map(&:bird)
  end
end
