namespace :db do
  desc "get bird songs into database"
  task :get_songs => :environment do
    Bird.where(song: nil).each do |bird|
      bird.update!(song: get_song(bird))
    end
  end
end
