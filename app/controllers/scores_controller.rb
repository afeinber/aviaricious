class ScoresController < ApplicationController

  respond_to :json

  def create
    binding.pry
    score = current_user.scores.create(score_params)
    respond_with score
  end

  def index
    binding.pry
    scores = current_user.scores
    binding.pry
    respond_with scores
  end

  private

  def score_params
    params.require(:score).permit(:percent)
  end
end
