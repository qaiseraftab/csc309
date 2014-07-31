class Party < ActiveRecord::Base
	belongs_to :host, :class_name => 'User'
	has_many :ratings
	has_many :raters, :through => :ratings, :source => :user
end
