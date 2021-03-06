namespace :birds do

  #note: please run the add bird images rake task first.
  desc 'remove the stupid images which wikipedia provides'
  task :remove_stupid_images => :environment do
    require 'wikipedia'

    Bird.all.each do |bird|
      count = 0
      # these are the stupid ones
      while bird.photo_url =~ /.*(\.ogg|\.svg).*/
        count += 1
        image = Wikipedia.find(bird.scientific_name).images[count]
        next unless image.present?
        thumb = JSON.parse Wikipedia::Client.new.request_image(image, iiurlwidth: 500, iiurlheight: 500)
        pages = search_hash(thumb, "pages")
        # binding.pry if count == 8
        imageinfo = search_hash(pages, 'imageinfo')
        bird.update!(photo_url: imageinfo[0]['thumburl'])
      end
    end
  end
end
