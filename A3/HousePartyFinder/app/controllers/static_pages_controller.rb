class StaticPagesController < ApplicationController
  before_filter :unauthenticated_only, only: [:register_login]

  def home
  end

  def register_login
  end

  def privacy_policy
  end
  
  def terms_of_use
  end
  
  def site_map
  end
  
  def about_us
  end

  private

  def unauthenticated_only
  	if signed_in?
  		redirect_to root_url
  	end
  end
end
