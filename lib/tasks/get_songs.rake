namespace :db do
  desc "get bird songs into database"
  task :get_songs => :environment do
    Bird.all.each do |bird|
      name = bird.scientific_name.split(' ')
      break unless name.length == 2
      res = HTTParty.get('http://www.xeno-canto.org/api/2/recordings?query='+ name[0] +'%20' + name[1])
      break if res['numRecordings'] == 0
      song = res['recordings'].first['file']
      song = HTTParty.get(song)
      bird.update(song: song.request.last_uri.to_s)
    end
  end
end
