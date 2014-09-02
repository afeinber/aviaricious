class ApplicationController < ActionController::Base

  respond_to :html, :json
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  before_filter :mock_ip_address

   def mock_ip_address
     if Rails.env == 'cucumber' || Rails.env == 'test'
       test_ip = ENV['RAILS_TEST_IP_ADDRESS']
       unless test_ip.nil? or test_ip.empty?
         request.instance_eval <<-EOS
           def remote_ip
             "#{test_ip}"
           end
         EOS
       end
     end
   end
end
