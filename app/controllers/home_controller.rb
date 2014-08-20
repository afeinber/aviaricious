class HomeController < ApplicationController

  def index
    render :file => 'public/views/home.html' and return
  end
end
