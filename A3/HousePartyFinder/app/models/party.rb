class Party < ActiveRecord::Base
	belongs_to :host, :class_name => 'User'
	has_many :ratings
	has_many :raters, :through => :ratings, :source => :user
	has_many :attendances
	has_many :attendees, :class_name => 'User', :through => :attendances, :source => :user
	scope :highest_attendees, lambda {where({id:self.id}).order(:attendees.count)}
  has_many :album_attachments

  has_attached_file :avatar, :url => '/system/uploads/party_avatar_:style_:id.:extension', :path => ":rails_root/public:url", :styles => { :medium => "240x240>", :thumbnail => "100x100>" }, :default_url => "/images/house.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

    def rating_score
  	  Party.where({ id: self.id }).joins(:ratings).average(:score)
    end

    def rating_count
  	  Party.where({ id: self.id }).joins(:ratings).count
    end
end
