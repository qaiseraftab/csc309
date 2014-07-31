class StaticPagesController < ApplicationController
  before_filter :unauthenticated_only, only: [:register_login]

  def home
  end

  def register_login
  end

  private

  def unauthenticated_only
  	if signed_in?
  		redirect_to root_url
  	end
  end
end
