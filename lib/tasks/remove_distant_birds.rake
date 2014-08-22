namespace :db do

  desc "remove the birds that aren't local"
  task :remove_distant_birds => :environment do

    require 'ebird'

    ebird = EBird::EBird.new

    observations = ebird.recent_observations_geo('42.20', '-71.12', {dist: '50', back: '30', max_results: '10000'})

    observations = observations['response']['result']['sighting']
    observations = observations.map { |obs| obs['sci_name'] }

    Bird.all.each do |bird|
      unless observations.include?(bird.scientific_name)
        bird.destroy
      end
    end
  end
end

