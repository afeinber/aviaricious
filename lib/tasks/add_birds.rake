namespace :db do

  desc "put birds into database"
  task :populate_birds => :environment do
    Bird.delete_all

    require 'ebird'

    ebird = EBird::EBird.new


    ebird.species_reference['response']['result']['taxa'].each do |bird|
      Bird.create!(common_name: bird['com_name'], scientific_name: bird['sci_name'])
    end
  end
end
