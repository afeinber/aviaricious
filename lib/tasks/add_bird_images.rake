namespace :db do
  desc 'add images for birds'
  task :add_bird_images => :environment do
    require 'wikipedia'

    count = 0
    Bird.all.each do |bird|
      bird.update!(photo_url: get_image(bird))
      puts count
      count += 1
    end
  end

end
