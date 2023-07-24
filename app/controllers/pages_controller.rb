class PagesController < ApplicationController
  def home
    respond_to do |format|
      Event.create(name: 'home_page_viewed')

      format.html # Render the default HTML template (if required)
      format.css  # Render the CSS template for the "text/css" format
    end
  end

  def login
  end
end
