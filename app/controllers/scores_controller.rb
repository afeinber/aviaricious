class ScoresController < ApplicationController

  respond_to :json

  def create
    score = current_user.scores.create(score_params)
    respond_with score
  end

  def index
    scores = current_user.scores
    respond_with scores
  end

  private

  def score_params
    params.require(:score).permit(:percent)
  end
end
