class IntakePhoneticQuestion < ApplicationRecord
  belongs_to :intake_assessment
  alias_attribute :assessment, :intake_assessment

  serialize :phonetic_sets, Array

  EXAMPLE_PHONETIC_SETS_DICTIONARY = {
    'baby' => [['b','eɪ','b','i']],
    # 'one' => [['w','ʌ','n']],
    # 'boat' => [['b','oʊ','t']],
    # 'do' => [['d','u']],
    # 'car' => [['k','ɑ','r']],
    # 'there' => [['ð','ɛr'], ['ð','eɪ','r']]
  }.with_indifferent_access.freeze

  def is_correct?
    IntakeAssessments::EvaluatePhoneticQuestion.call(question: self).correct
  end
end
