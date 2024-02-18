<template>
  <div>
    <center>
      <!-- Main Window -->
      <div class="window" style="width: 320px" @click="activateWindow('main')">
        <div :class="['title-bar nuhuh', { inactive: isMainInactive }]">
          <div class="title-bar-text">Blacksmith</div>
        </div>
        <div class="window-body">
          <p class="nuhuh">Click "Generate Password" to generate your secure password!</p>
          <button @click="generatePassword" style="margin-bottom: 10px">Generate Password</button>
          <ul class="tree-view">
            <li id="password">{{ generatedPassword }}</li>
          </ul>
        </div>
        <div class="status-bar">
          <p class="status-bar-field">Version: v{{ appVersion }}</p>
          <p class="status-bar-field" v-if="latestRelease">Release: {{ latestRelease.tag_name }}</p>
          <p class="status-bar-field">{{ commitCount }} Commits</p>
          <p class="status-bar-field">
            <a href="https://github.com/{{ owner }}/{{ repo }}">{{ owner }}/{{ repo }}</a>
          </p>
        </div>
      </div>
      <br />
      <!-- Settings Window -->
      <div class="window nuhuh" style="width: 320px" @click="activateWindow('settings')">
        <div :class="['title-bar', { inactive: isSettingsInactive }]">
          <div class="title-bar-text">Blacksmith Settings</div>
        </div>
        <div class="window-body">
          <div class="field-row">
            <button @click="resetSettings">Default</button>
          </div>
          <div class="field-row">
            <input checked type="checkbox" id="scrambleInput" v-model="scramble" />
            <label for="scrambleInput">Scramble</label>
          </div>
          <div class="field-row">
            <input checked type="checkbox" id="noWordsInput" v-model="noWords" />
            <label for="noWordsInput">No Words</label>
          </div>
          <div class="field-row">
            <input checked type="checkbox" id="randomLengthInput" v-model="randomLength" />
            <label for="randomLengthInput">Random Length</label>
          </div>
          <br />
          <div class="field-row">
            <label for="text17">Length</label>
            <input
              id="text17"
              type="text"
              v-model.number="passwordLength"
              :disabled="randomLength"
            />
          </div>
          <br />
          <fieldset>
            <legend>Language Selection:</legend>
            <div class="field-row">
              <label v-for="(value, key) in includeLanguages" :key="key" class="checkbox">
                <input type="checkbox" :id="'language_' + key" v-model="includeLanguages[key]" />
                <span class="checkbox-text">
                  {{ includeLanguages[key] ? '✓ ' : '' }}{{ getDisplayText(key) }}
                </span>
              </label>
            </div>
          </fieldset>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
import { languages } from '../characters.js'
import packageJson from '/package.json'
import VueCookies from 'vue-cookies'
import axios from 'axios'

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
      },
      isMainInactive: false,
      isSettingsInactive: true,
      passwordLength: 64,
      randomLength: false,
      latestRelease: null,
      ghAPI: 'https://api.github.com',
      owner: 'r1c0n',
      repo: 'blacksmith',
      sha: 'master',
      commitCount: null
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

      let passwordLength = this.passwordLength
      if (this.randomLength) {
        passwordLength = Math.floor(Math.random() * 50) + 50 // random length up to 100 characters
      }
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
    },
    activateWindow(window) {
      if (window === 'main') {
        this.isMainInactive = false
        this.isSettingsInactive = true
      } else if (window === 'settings') {
        this.isMainInactive = true
        this.isSettingsInactive = false
      }
    },
    saveSettingsToCookie() {
      VueCookies.set('settings', {
        scramble: this.scramble,
        noWords: this.noWords,
        includeLanguages: this.includeLanguages,
        passwordLength: this.passwordLength,
        randomLength: this.randomLength
      })
    },
    loadSettingsFromCookie() {
      const settings = VueCookies.get('settings')
      if (settings) {
        this.scramble = settings.scramble
        this.noWords = settings.noWords
        this.includeLanguages = settings.includeLanguages
        this.passwordLength = settings.passwordLength
        this.randomLength = settings.randomLength
      }
    },
    resetSettings() {
      VueCookies.remove('settings')
      window.location.reload()
    },
    fetchLatestRelease() {
      axios
        .get('https://api.github.com/repos/r1c0n/blacksmith/releases/latest')
        .then((response) => {
          this.latestRelease = response.data
        })
        .catch((error) => {
          console.error('Error fetching latest release:', error)
        })
    },
    // https://gist.github.com/yershalom/a7c08f9441d1aadb13777bce4c7cdc3b?permalink_comment_id=3278742#gistcomment-3278742
    httpGet(theUrl, returnHeaders) {
      var xmlHttp = new XMLHttpRequest()
      xmlHttp.open('GET', theUrl, false) // false for synchronous request
      xmlHttp.send(null)
      if (returnHeaders) {
        return xmlHttp
      }
      return xmlHttp.responseText
    },
    getCommitsCount() {
      let firstCommit = this.getFirstCommit()
      let compareUrl = `${this.ghAPI}/repos/${this.owner}/${this.repo}/compare/${firstCommit}...${this.sha}`
      let commitReq = this.httpGet(compareUrl)
      let commitCount = JSON.parse(commitReq)['total_commits'] + 1
      console.log('Commit Count: ', commitCount)
      this.commitCount = commitCount
    },
    getFirstCommit() {
      let url = `${this.ghAPI}/repos/${this.owner}/${this.repo}/commits`
      let req = this.httpGet(url, true)
      let firstCommitHash = ''
      if (req.getResponseHeader('Link')) {
        let pageUrl = req
          .getResponseHeader('Link')
          .split(',')[1]
          .split(';')[0]
          .split('<')[1]
          .split('>')[0]
        let reqLastCommit = this.httpGet(pageUrl)
        let firstCommit = JSON.parse(reqLastCommit)
        firstCommitHash = firstCommit[firstCommit.length - 1]['sha']
      } else {
        let firstCommit = JSON.parse(req.responseText)
        firstCommitHash = firstCommit[firstCommit.length - 1]['sha']
      }
      return firstCommitHash
    }
  },
  mounted() {
    this.loadSettingsFromCookie()
    this.fetchLatestRelease()
    this.getCommitsCount(this.owner, this.repo, this.sha)
  },
  watch: {
    scramble() {
      this.saveSettingsToCookie()
    },
    noWords() {
      this.saveSettingsToCookie()
    },
    includeLanguages: {
      handler() {
        this.saveSettingsToCookie()
      },
      deep: true
    },
    passwordLength() {
      this.saveSettingsToCookie()
    },
    randomLength() {
      this.saveSettingsToCookie()
    }
  }
}
</script>
