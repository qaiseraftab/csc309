class Party < ActiveRecord::Base
	belongs_to :host, :class_name => 'User'
	has_many :ratings
	has_many :raters, :through => :ratings, :source => :user
	has_many :attendances
	has_many :attendees, :class_name => 'User', :through => :attendances, :source => :user
end
