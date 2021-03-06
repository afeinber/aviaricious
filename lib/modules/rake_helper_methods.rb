module RakeHelperMethods
  def search_hash(h, search)
    return h[search] if h.fetch(search, false)

    h.keys.each do |k|
      answer = search_hash(h[k], search) if h[k].is_a? Hash
      return answer if answer
    end

    false
  end

  def get_image(bird)
    count = 0
    photo = bird.photo_url

    #dont want .ogg or .svg files
    while photo =~ /.*(\.ogg|\.svg).*/ || photo.nil?
      count += 1
      #get image from wikipedia
      image = Wikipedia.find(bird.scientific_name).images[count]
      return unless image.present?
      #now get the smaller image
      thumb = JSON.parse Wikipedia::Client.new.request_image(image, iiurlwidth: 500, iiurlheight: 500)
      pages = search_hash(thumb, "pages")
      imageinfo = search_hash(pages, 'imageinfo')
      photo =  imageinfo[0]['thumburl']
    end

    return photo
  end

  def get_song(bird)
    name = bird.scientific_name.split(' ')
    return unless name.length == 2
    res = HTTParty.get('http://www.xeno-canto.org/api/2/recordings?query='+ name[0] +'%20' + name[1])
    return if res['numRecordings'] == "0"
    song = res['recordings'].first['file']
    song = HTTParty.get(song)
    song.request.last_uri.to_s
  end

end

