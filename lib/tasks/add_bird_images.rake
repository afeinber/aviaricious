namespace :db do
  desc 'add images for birds'
  task :add_bird_images => :environment do
    require 'wikipedia'

    def search_hash(h, search)
      return h[search] if h.fetch(search, false)

      h.keys.each do |k|
        answer = search_hash(h[k], search) if h[k].is_a? Hash
        return answer if answer
      end

      false
    end

    count = 0
    Bird.all.each do |bird|
      image = Wikipedia.find(bird.scientific_name).images.first
      next unless image.present?
      thumb = JSON.parse Wikipedia::Client.new.request_image(image, iiurlwidth: 500, iiurlheight: 500)
      pages = search_hash(thumb, "pages")
      # binding.pry if count == 8
      imageinfo = search_hash(pages, 'imageinfo')
      bird.update!(photo_url: imageinfo[0]['thumburl'])
      puts count
      count += 1
    end
  end

end
