<template>
  <div>
    <center>
      <div class="container">
        <h1>Recon's Password Generator</h1>
        <p>Click the button below to generate a secure password.</p>
        <button @click="generatePassword">Generate Password</button>
        <input type="checkbox" id="scrambleCheckbox" v-model="scramble" />
        <!-- bind checkbox to 'scramble' data property -->
        <label for="scrambleCheckbox">Scramble Password</label>
        <div id="password">{{ generatedPassword }}</div>
      </div>
      <div class="footer">
        <p>Current Version: v1.0.0 | <a href="./sites.html">Websites</a></p>
      </div>
    </center>
  </div>
</template>

<script>
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
const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 101))

export default {
  data() {
    return {
      scramble: false,
      generatedPassword: ''
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
      const languageArrays = [
        germanWords,
        dutchWords,
        chineseWords,
        russianWords,
        vietnameseWords,
        koreanWords,
        numbers
      ]
      const randomIndex = Math.floor(Math.random() * languageArrays.length)
      return languageArrays[randomIndex]
    },
    getRandomWord(languageArray) {
      const randomIndex = Math.floor(Math.random() * languageArray.length)
      return languageArray[randomIndex]
    }
  }
}
</script>
