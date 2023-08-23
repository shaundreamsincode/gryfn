class PagesController < ApplicationController
  def home
    respond_to do |format|
      format.json do
        # Handle the JSON format
      end

      format.html do
        # Handle HTML format
      end
      format.mp3 do
        head 200
        # Handle audio/mpeg format
        # For example, you can send the audio file using 'send_file' or 'send_data'
        # send_file Rails.root.join('path-to-your-audio-file.mp3'), type: 'audio/mpeg', disposition: 'inline'
      end
    end
  end
end
