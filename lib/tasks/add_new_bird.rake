require 'rake'

namespace :birds do
  desc 'add one new bird to database'
  task :add_new_bird, [:sci_name] do |t, args|
    require 'ebird'
    require 'wikipedia'

    #if it's already there then return
    if Bird.find_by(scientific_name: args[:sci_name]).present?
      next
    end

    ebird = EBird::EBird.new

    #have scientific name, need common name
    ebird.species_reference['response']['result']['taxa'].each do |bird|
      if bird['sci_name'] == args[:sci_name]
        @new_bird = Bird.create!(common_name: bird['com_name'], scientific_name: bird['sci_name'])
        break
      end
    end

    #now we need the image
    @new_bird.update!(photo_url: get_image(@new_bird))

    #and we need the song
    @new_bird.update!(song: get_song(@new_bird))

  end
end
