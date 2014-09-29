class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :favorites, dependent: :destroy
  has_many :scores, dependent: :destroy

  geocoded_by :current_ip
  after_save :geocode

  def current_ip
    binding.pry
    current_sign_in_ip.to_s
  end

end
