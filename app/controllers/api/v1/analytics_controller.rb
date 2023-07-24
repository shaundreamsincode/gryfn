module Api
  module V1
    class AnalyticsController < ApiController
      def index
        render json: {
          chat_created_events: Event.where(name: 'chat_created').map {|e| JSON.parse(e.to_json) },
          summary_email_sent_events: Event.where(name: 'summary_email_sent').map {|e| JSON.parse(e.to_json) },
          home_page_viewed: Event.where(name: 'home_page_viewed').map { |e| JSON.parse(e.to_json) }
        }
      end
    end
  end
end
