require 'rails_helper'

describe "Bird" do
  fixtures :birds

  it 'has all the birds' do
    expect(birds(:birds_001).common_name).to eq Bird.find_by(scientific_name: "Tinamus osgoodi").common_name
    expect(Bird.count).to eq 10404
  end
end
