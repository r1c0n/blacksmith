<template>
  <div>
    <center>
      <div class="container">
        <h1>Recon's Password Generator</h1>
        <p>Click the button below to generate a secure password.</p>
        <button @click="generatePassword">Generate Password</button>
        <div class="dropdown">
          <button class="dropbtn">Language Options</button>
          <div class="dropdown-content">
            <label>
              <input type="checkbox" v-model="scramble" />
              Scramble Password
            </label>
            <label>
              <input type="checkbox" v-model="noWords" />
              No Words
            </label>
            <hr />
            <label v-for="(value, key) in includeLanguages" :key="key">
              <input type="checkbox" v-model="includeLanguages[key]" />
              {{ getDisplayText(key) }}
            </label>
          </div>
        </div>
        <div id="password">{{ generatedPassword }}</div>
      </div>
      <div class="footer">
        <p>Current Version: {{ appVersion }}</p>
      </div>
    </center>
  </div>
</template>

<script>
import { languages } from '../characters.js'
import packageJson from '/package.json'

export default {
  data() {
    return {
      scramble: false,
      generatedPassword: '',
      noWords: false,
      includeLanguages: {
        english: true,
        german: true,
        viet: true,
        chinese: true,
        russian: true,
        numbers: true,
        specialchars: true
      }
    }
  },
  computed: {
    appVersion() {
      return packageJson.version
    }
  },
  methods: {
    generatePassword() {
      // check if no language is selected
      const allLanguagesUnchecked = Object.values(this.includeLanguages).every((value) => !value)

      if (allLanguagesUnchecked) {
        this.includeLanguages.english = true // default to english
      }

      const passwordLength = Math.floor(Math.random() * 50) + 50 // random length up to 100 characters
      let password = ''
      this.usedWords = []

      // ensure the password meets the criteria
      let lowercaseCount = 0
      while (password.length < passwordLength) {
        const languageArray = this.getRandomLanguageArray()

        if (this.includeLanguages[languageArray.name]) {
          const randomWord = this.getRandomWord(languageArray)

          // check if special characters checkbox is checked
          if (languageArray.name === 'specialchars' && Math.random() < 0.1) {
            const randomSpecialChar = '!@#$%^&*()_-+=<>?'[
              Math.floor(Math.random() * '!@#$%^&*()_-+=<>?'.length)
            ]
            password += randomSpecialChar
          }

          password += randomWord
          if (
            languageArray !== languages.specialCharacters &&
            languageArray !== languages.numbers
          ) {
            this.usedWords.push(randomWord)
          }
        }
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

      // log debug information
      console.log('Generated Password:', password)
      console.log('Password Length:', password.length)
      console.log('Scramble:', this.scramble)
      console.log('No Words:', this.noWords)
      console.log('Used Words:', this.usedWords)
      console.log('App Version:', this.appVersion)
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
          { name: 'english', array: languages.letters.english },
          { name: 'german', array: languages.letters.german },
          { name: 'viet', array: languages.letters.viet },
          { name: 'chinese', array: languages.letters.chinese },
          { name: 'specialchars', array: languages.specialCharacters },
          { name: 'numbers', array: languages.numbers }
        ]
        const randomIndex = Math.floor(Math.random() * letterArrays.length)
        return letterArrays[randomIndex]
      } else {
        const languageArrays = [
          { name: 'english', array: languages.words.english },
          { name: 'german', array: languages.words.german },
          { name: 'chinese', array: languages.words.chinese },
          { name: 'russian', array: languages.words.russian },
          { name: 'viet', array: languages.words.viet },
          { name: 'specialchars', array: languages.specialCharacters },
          { name: 'numbers', array: languages.numbers }
        ]
        const randomIndex = Math.floor(Math.random() * languageArrays.length)
        return languageArrays[randomIndex]
      }
    },
    getRandomWord(languageArray) {
      const randomIndex = Math.floor(Math.random() * languageArray.array.length)
      return languageArray.array[randomIndex]
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    getDisplayText(key) {
      if (key === 'specialchars') {
        return 'Special'
      } else {
        return this.capitalizeFirstLetter(key)
      }
    }
  }
}
</script>
