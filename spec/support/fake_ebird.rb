require 'sinatra/base'

class FakeEbird < Sinatra::Base

  get '/ws1.1/data/obs/geo/recent' do
    json_response 200, 'recent_birds.json'
  end

    private

    def json_response(response_code, file_name)
      content_type :json
      status response_code
      File.open(File.dirname(__FILE__) + '/fixtures/' + file_name, 'rb').read
    end
end
