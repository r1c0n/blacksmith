<template>
  <div>
    <center>
      <div class="container">
        <h1>Recon's Password Generator</h1>
        <p>Click the button below to generate a secure password.</p>
        <button @click="generatePassword">Generate Password</button>
        <input type="checkbox" id="scrambleCheckbox" v-model="scramble" />
        <label for="scrambleCheckbox">Scramble Password</label>
        <input type="checkbox" id="noWordsCheckbox" v-model="noWords" />
        <label for="noWordsCheckbox">No Words</label>
        <div id="password">{{ generatedPassword }}</div>
      </div>
      <div class="footer">
        <p>Current Version: {{ appVersion }}</p>
      </div>
    </center>
  </div>
</template>

<script>
import packageJson from '/package.json'

const germanWords = [
  'Apfel',
  'Haus',
  'Auto',
  'Tisch',
  'Kuchen',
  'Stuhl',
  'Blume',
  'Fenster',
  'Garten',
  'Wasser'
]
const dutchWords = [
  'Huis',
  'Appel',
  'Auto',
  'Tafel',
  'Taart',
  'Stoel',
  'Bloem',
  'Raam',
  'Tuin',
  'Water'
]
const chineseWords = ['苹果', '家', '汽车', '桌子', '蛋糕', '椅子', '花', '窗户', '花园', '水']
const russianWords = [
  'Дом',
  'Яблоко',
  'Машина',
  'Стол',
  'Пирог',
  'Стул',
  'Цветок',
  'Окно',
  'Сад',
  'Вода'
]
const vietnameseWords = [
  'Nhà',
  'Quả táo',
  'Xe hơi',
  'Bàn',
  'Bánh',
  'Ghế',
  'Hoa',
  'Cửa sổ',
  'Vườn',
  'Nước'
]
const koreanWords = ['집', '사과', '자동차', '테이블', '케이크', '의자', '꽃', '창문', '정원', '물']
const germanLetters = ['ä', 'Ä', 'ö', 'Ö', 'ü', 'Ü', 'ß']
const dutchLetters = ['ä', 'Ä', 'ë', 'Ë', 'ï', 'Ï', 'ö', 'Ö', 'ü', 'Ü', 'ÿ', 'Ÿ']
const vietnameseLetters = [
  'ạ',
  'Ạ',
  'ả',
  'Ả',
  'ầ',
  'Ầ',
  'ấ',
  'Ấ',
  'ậ',
  'Ậ',
  'ẩ',
  'Ẩ',
  'ẫ',
  'Ẫ',
  'ắ',
  'Ắ',
  'ằ',
  'Ằ',
  'ẳ',
  'Ẳ',
  'ẵ',
  'Ẵ',
  'ặ',
  'Ặ',
  'ẹ',
  'Ẹ',
  'ẻ',
  'Ẻ',
  'ẽ',
  'Ẽ',
  'ề',
  'Ề',
  'ế',
  'Ế',
  'ể',
  'Ể',
  'ễ',
  'Ễ',
  'ệ',
  'Ệ',
  'ỉ',
  'Ỉ',
  'ị',
  'Ị',
  'ọ',
  'Ọ',
  'ỏ',
  'Ỏ',
  'ồ',
  'Ồ',
  'ổ',
  'Ổ',
  'ỗ',
  'Ỗ',
  'ộ',
  'Ộ',
  'ớ',
  'Ớ',
  'ờ',
  'Ờ',
  'ở',
  'Ở',
  'ỡ',
  'Ỡ',
  'ợ',
  'Ợ',
  'ụ',
  'Ụ',
  'ủ',
  'Ủ',
  'ứ',
  'Ứ',
  'ừ',
  'Ừ',
  'ử',
  'Ử',
  'ữ',
  'Ữ',
  'ự',
  'Ự',
  'ỳ',
  'Ỳ',
  'ỵ',
  'Ỵ',
  'ỷ',
  'Ỷ',
  'ỹ',
  'Ỹ'
]
const chineseLetters = ['龘', '龍', '齉', '龠', '龔', '龖', '龍', '龎', '龑', '龏']
const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 101))
const specialCharacters = [
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '-',
  '_',
  '=',
  '+',
  '[',
  ']',
  '{',
  '}',
  '|',
  '\\',
  ';',
  ':',
  "'",
  '"',
  ',',
  '.',
  '<',
  '>',
  '/',
  '?'
]

export default {
  data() {
    return {
      scramble: false,
      generatedPassword: '',
      noWords: false
    }
  },
  computed: {
    appVersion() {
      return packageJson.version
    }
  },
  methods: {
    generatePassword() {
      const passwordLength = Math.floor(Math.random() * 50) + 50 // random length up to 100 characters
      let password = ''

      // ensure the password meets the criteria
      let lowercaseCount = 0
      while (password.length < passwordLength) {
        const languageArray = this.getRandomLanguageArray()
        const randomWord = this.getRandomWord(languageArray)

        // add a random special character with a 10% chance
        if (Math.random() < 0.1) {
          const randomSpecialChar = '!@#$%^&*()_-+=<>?'[
            Math.floor(Math.random() * '!@#$%^&*()_-+=<>?'.length)
          ]
          password += randomSpecialChar
        }

        password += randomWord
      }

      // remove spaces from the password
      password = password.replace(/\s+/g, '')

      // capitalize random characters while ensuring at least 20 lowercase characters remain
      const passwordArray = password.split('')
      for (let i = 0; i < passwordArray.length; i++) {
        if (Math.random() < 0.5 && lowercaseCount < 20) {
          passwordArray[i] = passwordArray[i].toLowerCase()
          lowercaseCount++
        } else {
          passwordArray[i] = passwordArray[i].toUpperCase()
        }
      }
      password = passwordArray.join('')

      // check if the scramble checkbox is checked
      if (this.scramble) {
        password = this.scramblePassword(password)
      }

      this.generatedPassword = password
    },
    scramblePassword(password) {
      const passwordArray = password.split('')
      for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]] // swap characters
      }
      return passwordArray.join('')
    },
    getRandomLanguageArray() {
      if (this.noWords) {
        const letterArrays = [
          germanLetters,
          dutchLetters,
          vietnameseLetters,
          chineseLetters,
          numbers,
          specialCharacters
        ]
        const randomIndex = Math.floor(Math.random() * letterArrays.length)
        return letterArrays[randomIndex]
      } else {
        const languageArrays = [
          germanWords,
          dutchWords,
          chineseWords,
          russianWords,
          vietnameseWords,
          koreanWords,
          numbers,
          specialCharacters
        ]
        const randomIndex = Math.floor(Math.random() * languageArrays.length)
        return languageArrays[randomIndex]
      }
    },
    getRandomWord(languageArray) {
      const randomIndex = Math.floor(Math.random() * languageArray.length)
      return languageArray[randomIndex]
    }
  }
}
</script>
