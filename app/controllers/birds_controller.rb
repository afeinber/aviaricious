class BirdsController < ApplicationController
  require 'rake'

  def index
    #shouldnt change all that much
    bird_json = Rails.cache.fetch('birds', expires_in: 1.days) do
      Bird.all.to_json
    end
    render json: bird_json
  end

  def show
    @bird = Bird.find_by(scientific_name: params[:id])

    #if we dont have the bird in the database, go get it
    unless @bird.present?
      #note that this takes a while. I think this is O.K. because
      #it should ideally not happen  that much that a user attempts to view
      #a bird that isn't there.
      Rake::Task[ "birds:add_new_bird" ].invoke(params[:id])
      @bird = Bird.find_by(scientific_name: params[:id])
    end

    is_favorite = current_user.favorites.exists?(bird: @bird)

    #need the favorite so we can decide whether or not to color
    #the little heart.
    render json: { bird: @bird, favorite: is_favorite }
  end
end
