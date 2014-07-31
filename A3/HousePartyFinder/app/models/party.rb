class Party < ActiveRecord::Base
	has_many :ratings
	has_many :raters, :through => :ratings, :source => :user
end
