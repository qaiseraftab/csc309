class Party < ActiveRecord::Base
	belongs_to :host, :class_name => 'User'
	has_many :ratings
	has_many :raters, :through => :ratings, :source => :user
	has_many :attendances
	has_many :attendees, :class_name => 'User', :through => :attendances, :source => :user
  has_many :album_attachments

  has_attached_file :avatar, :url => '/system/uploads/party_avatar_:style_:id.:extension', :path => ":rails_root/public:url", :styles => { :medium => "240x240>", :thumbnail => "100x100>" }, :default_url => "/images/house.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

    def rating_score
  	  Party.where({ id: self.id }).joins(:ratings).average(:score) || 0
    end

    def rating_count
  	  Party.where({ id: self.id }).joins(:ratings).count
    end

    def similar
      keywords = self.name.split.map { |x| ActiveRecord::Base.connection.quote(x).slice(1, -1) }
      p = Party.arel_table
      matcher = p[:name].matches("%#{keywords[0]}%")
      keywords.each do |kw|
        if (kw != keywords[0])
          matcher = matcher.or(p[:name].matches("%#{kw}%"))
        end
      end
      return Party.where(matcher).where.not(:id => self.id)
    end
end
