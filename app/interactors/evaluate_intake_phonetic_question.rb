class EvaluateIntakePhoneticQuestion
  include Interactor

  SOUNDS = {
    'eɪ' => ['a_e', 'ai', 'ay', 'ey', 'ei', 'eigh', 'aigh', 'a'],
    'æ' => ['a', 'ah'],
    'i' => ['ee', 'ea', 'ie', 'ei', 'i', 'y', 'e', 'ey'],
    'ɛ' => ['e', 'eh'],
    'ɑɪ' => ['i_e', 'y_e', 'igh', 'ie', 'i'],
    'ɪ' => ['i', 'y', 'e', 'ih'],
    'oʊ' => ['o_e', 'o', 'oa', 'ow', 'oe', 'ough', 'ou', 'oh'],
    'ɑ' => ['o', 'a', 'ah'],
    'ju' => ['u_e', 'ue', 'ew', 'yu', 'u'],
    'ʌ' => ['u', 'uh', 'a', 'oo'],
    'ʊ' => ['oo', 'u', 'ou', 'oul'],
    'u' => ['u', 'ui', 'oo', 'ou', 'ue', 'ew', 'eu'],
    'ər' => ['r', 'er', 'ir', 'or', 'ur', 'ure'],
    'ɛr' => ['air', 'ere', 'eyr', 'ear', 'are', 'eir', 'ar', 'ayr'],
    'ð' => ['th', 'the'],
    'ɔ' => ['o', 'augh', 'ough', 'aw', 'a', 'au'],
    'ə' => ['a', 'e', 'i', 'o', 'u', 'ah', 'eh', 'ih', 'uh'],
    'dʒ' => ['j'],
    'ʃ' => ['sh', 'ch', 'ti', 'ss', 's'],
    'tʃ' => ['ch'],
    'ŋ' => ['ng'],
    'ʒ' => ['si', 's', 'g', 'z', 'j', 'sh'],
    'j'=> ['y', 'i'],
    'k'=> ['k', 'c', 'ck'],
    'w'=> ['w', 'wh', 'u'],
    'x'=> ['x', 'xs', 'cs', 'ks', 'cks'],
    'z'=> ['z', 's'],
    's'=> ['s', 'c'],
    'dd'=> ['dd', 'd'],
    'pp'=> ['pp', 'p'],
    'll'=> ['ll', 'l'],
    'nn'=> ['nn', 'n'],
    'ss'=> ['s', 'ss'],
  }

  def call
    context.correct = (context.question.answer.downcase === context.question.correct_answer.downcase || has_correct_phonetic_words?)
  end

  private def has_correct_phonetic_words?
    correct_answers = []

    context.question.phonetic_sets.each do |pronunciation|
      possible_answers = {}

      pronunciation.each_with_index do |sound, x|
        if SOUNDS.key?(sound)
          possible_answers[x] = SOUNDS[sound]
        else
          possible_answers[x] = [sound]
        end
      end

      combos = possible_answers.values.select { |sound| sound.is_a?(Array) }

      combinations = cartesian_product(*combos)

      template = possible_answers.values.map.with_index do |sound, index|
        sound.is_a?(Array) ? index.to_s : sound
      end

      combinations.each do |combo|
        answer = template.map do |sound|
          sound_i = sound.to_i
          sound_i.is_a?(Numeric) ? combo[sound_i] : sound
        end.join

        if answer.include?('_e')
          answer = answer.sub('_e', '') + 'e'
          correct_answers.push(answer[0...-1])
        end
        correct_answers.push(answer)
      end
    end

    correct_answers.include?(context.question.answer)
  end

  private def cartesian_product(*arrays)
    arrays.reduce([[]]) do |acc, arr|
      acc.flat_map { |x| arr.map { |y| x + [y] } }
    end
  end
end
