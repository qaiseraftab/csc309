class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :ratings
  has_many :rated_parties, :through => :ratings, :source => :party
  has_many :subscriptions
  has_many :subscribers, :through => :subscriptions, :source => :subscriber
  has_many :out_subscriptions, :class_name => 'Subscription', :foreign_key => 'subscriber_id'
  has_many :out_subscribers, :through => :out_subscriptions, :source => :user
  has_many :hosted_parties, :class_name => 'Party', :foreign_key => 'host_id'
  has_many :attendances
  has_many :attended_parties, :through => :attendances, :source => :party

  def rating_score
  	User.where({ id: self.id }).joins(:hosted_parties).joins(:ratings).average(:score)
  end

  def rating_count
  	User.where({ id: self.id }).joins(:hosted_parties).joins(:ratings).count
  end
end
