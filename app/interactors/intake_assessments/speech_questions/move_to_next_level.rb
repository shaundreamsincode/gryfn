module IntakeAssessments
  module SpeechQuestions
    class MoveToNextLevel
      include Interactor

      def call
        assessment = context.assessment
      end
    end
  end
end
