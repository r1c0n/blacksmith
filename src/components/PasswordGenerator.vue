<template>
  <div>
    <center>
      <!-- Main Window -->
      <div class="window" style="width: 380px" @click="activateWindow('main')">
        <TitleBar :title="'Blacksmith'" :inactive="isMainInactive" />
        <div class="window-body">
          <p class="nuhuh">Click "Generate Password" to create your secure password!</p>
          <button @click="generatePassword" style="margin-bottom: 10px">Generate Password</button>
          <ul class="tree-view">
            <li id="password" class="gen">
              {{ generatedPassword || 'No password generated yet' }}
            </li>
          </ul>
          <button @click="copyToClipboard" style="margin-top: 10px" :disabled="!generatedPassword">
            {{ copyButtonText }}
          </button>
          <div v-if="passwordStrength" style="margin-top: 10px">
            <p>
              <strong>Strength:</strong>
              <span :style="{ color: passwordStrength.color }">{{ passwordStrength.label }}</span>
            </p>
            <p class="nuhuh" style="font-size: 11px">
              Upper: {{ passwordStats.uppercase }} | Lower: {{ passwordStats.lowercase }} | Nums:
              {{ passwordStats.numbers }} | Special: {{ passwordStats.special }}
            </p>
          </div>
        </div>
        <div class="status-bar">
          <p class="status-bar-field">Version: v{{ appVersion }}</p>
          <p class="status-bar-field" v-if="latestRelease">Release: {{ latestRelease.tag_name }}</p>
          <p class="status-bar-field">{{ commitCount }} Commits</p>
          <p class="status-bar-field">
            <a href="https://github.com/r1c0n/blacksmith">{{ owner }}/{{ repo }}</a>
          </p>
        </div>
      </div>
      <br />
      <!-- Settings Window -->
      <div class="window nuhuh" style="width: 380px" @click="activateWindow('settings')">
        <TitleBar :title="'Blacksmith Settings'" :inactive="isSettingsInactive" />
        <div class="window-body">
          <div class="field-row">
            <button @click="resetSettings">Reset to Default</button>
          </div>
          <div class="field-row">
            <input type="checkbox" id="randomLengthInput" v-model="settings.randomLength" />
            <label for="randomLengthInput">Random Length</label>
          </div>
          <br />
          <div class="field-row">
            <label for="lengthInput">Length (8-128)</label>
            <input
              id="lengthInput"
              type="number"
              min="8"
              max="128"
              v-model.number="settings.passwordLength"
              :disabled="settings.randomLength"
            />
          </div>
          <br />
          <fieldset>
            <legend>Minimum Requirements:</legend>
            <div class="field-row">
              <label for="minUppercase">Min Uppercase:</label>
              <input
                id="minUppercase"
                type="number"
                min="0"
                max="20"
                v-model.number="settings.minUppercase"
              />
            </div>
            <div class="field-row">
              <label for="minLowercase">Min Lowercase:</label>
              <input
                id="minLowercase"
                type="number"
                min="0"
                max="20"
                v-model.number="settings.minLowercase"
              />
            </div>
            <div class="field-row">
              <label for="minNumbers">Min Numbers:</label>
              <input
                id="minNumbers"
                type="number"
                min="0"
                max="20"
                v-model.number="settings.minNumbers"
                :disabled="!settings.includeLanguages.numbers"
              />
            </div>
            <div class="field-row">
              <label for="minSpecial">Min Special:</label>
              <input
                id="minSpecial"
                type="number"
                min="0"
                max="20"
                v-model.number="settings.minSpecial"
                :disabled="!settings.includeLanguages.specialchars"
              />
            </div>
          </fieldset>
          <br />
          <fieldset>
            <legend>Language Selection:</legend>
            <div class="language-checkboxes">
              <div
                v-for="(value, key) in settings.includeLanguages"
                :key="key"
                class="language-checkbox-row"
              >
                <input
                  type="checkbox"
                  :id="'language_' + key"
                  v-model="settings.includeLanguages[key]"
                />
                <label :for="'language_' + key">{{ getDisplayText(key) }}</label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
import { languages } from '../characters.js'
import TitleBar from './TitleBar.vue'
import packageJson from '/package.json'
import axios from 'axios'

export default {
  components: { TitleBar },
  data() {
    return {
      generatedPassword: '',
      settings: {
        includeLanguages: {
          english: true,
          german: true,
          viet: true,
          chinese: true,
          russian: true,
          numbers: true,
          specialchars: true
        },
        passwordLength: 16,
        randomLength: false,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSpecial: 1
      },
      isMainInactive: false,
      isSettingsInactive: true,
      latestRelease: null,
      owner: 'r1c0n',
      repo: 'blacksmith',
      sha: 'master',
      commitCount: null,
      copyButtonText: 'Copy Password',
      passwordStats: { uppercase: 0, lowercase: 0, numbers: 0, special: 0 }
    }
  },
  computed: {
    appVersion() {
      return packageJson.version
    },
    passwordStrength() {
      if (!this.generatedPassword) return null
      const len = this.generatedPassword.length
      const hasUpper = this.passwordStats.uppercase > 0
      const hasLower = this.passwordStats.lowercase > 0
      const hasNum = this.passwordStats.numbers > 0
      const hasSpecial = this.passwordStats.special > 0

      let score = 0
      if (len >= 8) score++
      if (len >= 12) score++
      if (len >= 16) score++
      if (hasUpper) score++
      if (hasLower) score++
      if (hasNum) score++
      if (hasSpecial) score++

      if (score <= 3) return { label: 'Weak', color: '#ff4444' }
      if (score <= 5) return { label: 'Medium', color: '#ffaa00' }
      return { label: 'Strong', color: '#44ff44' }
    }
  },
  methods: {
    generatePassword() {
      const allLanguagesUnchecked = Object.values(this.settings.includeLanguages).every((v) => !v)
      if (allLanguagesUnchecked) {
        this.settings.includeLanguages.english = true
      }

      const MAX_RANDOM_LENGTH = 128
      const MIN_RANDOM_LENGTH = 56
      let passwordLength = this.settings.passwordLength
      if (this.settings.randomLength) {
        passwordLength =
          Math.floor(Math.random() * (MAX_RANDOM_LENGTH - MIN_RANDOM_LENGTH + 1)) +
          MIN_RANDOM_LENGTH
      }

      let password = this.buildPasswordWithRequirements(passwordLength)
      this.generatedPassword = password
      this.calculatePasswordStats(password)
      this.saveSettings()
    },

    buildPasswordWithRequirements(length) {
      let password = []
      let remaining = length

      // add minimum required characters
      for (let i = 0; i < this.settings.minUppercase && remaining > 0; i++) {
        password.push(this.getRandomChar('uppercase'))
        remaining--
      }
      for (let i = 0; i < this.settings.minLowercase && remaining > 0; i++) {
        password.push(this.getRandomChar('lowercase'))
        remaining--
      }

      if (this.settings.includeLanguages.numbers) {
        for (let i = 0; i < this.settings.minNumbers && remaining > 0; i++) {
          password.push(this.getRandomChar('number'))
          remaining--
        }
      }

      if (this.settings.includeLanguages.specialchars) {
        for (let i = 0; i < this.settings.minSpecial && remaining > 0; i++) {
          password.push(this.getRandomChar('special'))
          remaining--
        }
      }

      // fill remaining with random characters as before
      while (remaining > 0) {
        const langArray = this.getRandomLanguageArray()
        if (this.settings.includeLanguages[langArray.name]) {
          const char = this.getRandomWord(langArray)
          const processedChars = char.split('')
          for (const c of processedChars) {
            if (remaining > 0) {
              password.push(Math.random() < 0.5 ? c.toUpperCase() : c.toLowerCase())
              remaining--
            }
          }
        }
      }

      // Shuffle
      for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[password[i], password[j]] = [password[j], password[i]]
      }

      return password.join('').substring(0, length)
    },
    getRandomChar(type) {
      const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const lowercase = 'abcdefghijklmnopqrstuvwxyz'
      const numbers = '0123456789'
      const special = '!@#$%^&*()_-+=<>?'

      let chars
      switch (type) {
        case 'uppercase':
          chars = uppercase
          break
        case 'lowercase':
          chars = lowercase
          break
        case 'number':
          chars = numbers
          break
        case 'special':
          chars = special
          break
      }
      return chars[Math.floor(Math.random() * chars.length)]
    },

    getRandomLanguageArray() {
      const letterArrays = [
        { name: 'english', array: languages.letters.english },
        { name: 'german', array: languages.letters.german },
        { name: 'viet', array: languages.letters.viet },
        { name: 'chinese', array: languages.letters.chinese },
        { name: 'specialchars', array: languages.specialCharacters },
        { name: 'numbers', array: languages.numbers }
      ]
      return letterArrays[Math.floor(Math.random() * letterArrays.length)]
    },

    getRandomWord(langArray) {
      return String(langArray.array[Math.floor(Math.random() * langArray.array.length)])
    },

    calculatePasswordStats(password) {
      this.passwordStats = {
        uppercase: (password.match(/[A-Z]/g) || []).length,
        lowercase: (password.match(/[a-z]/g) || []).length,
        numbers: (password.match(/[0-9]/g) || []).length,
        special: (password.match(/[^A-Za-z0-9]/g) || []).length
      }
    },

    copyToClipboard() {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard
          .writeText(this.generatedPassword)
          .then(() => {
            this.copyButtonText = 'Copied!'
            setTimeout(() => {
              this.copyButtonText = 'Copy Password'
            }, 2000)
          })
          .catch((err) => {
            this.copyButtonText = 'Copy Failed'
            setTimeout(() => {
              this.copyButtonText = 'Copy Password'
            }, 2000)
            console.error('Failed to copy password:', err)
          })
      } else {
        // Fallback for browsers without navigator.clipboard
        try {
          const textarea = document.createElement('textarea')
          textarea.value = this.generatedPassword
          textarea.setAttribute('readonly', '')
          textarea.style.position = 'absolute'
          textarea.style.left = '-9999px'
          document.body.appendChild(textarea)
          textarea.select()
          const successful = document.execCommand('copy')
          document.body.removeChild(textarea)
          if (successful) {
            this.copyButtonText = 'Copied!'
            setTimeout(() => {
              this.copyButtonText = 'Copy Password'
            }, 2000)
          } else {
            this.copyButtonText = 'Copy Failed'
            setTimeout(() => {
              this.copyButtonText = 'Copy Password'
            }, 2000)
            console.error('Fallback: Failed to copy password')
          }
        } catch (err) {
          this.copyButtonText = 'Copy Failed'
          setTimeout(() => {
            this.copyButtonText = 'Copy Password'
          }, 2000)
          console.error('Fallback: Failed to copy password:', err)
        }
      }
    },

    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },

    getDisplayText(key) {
      return key === 'specialchars' ? 'Special' : this.capitalizeFirstLetter(key)
    },

    activateWindow(window) {
      this.isMainInactive = window !== 'main'
      this.isSettingsInactive = window !== 'settings'
    },

    saveSettings() {
      const expires = new Date()
      expires.setFullYear(expires.getFullYear() + 1)
      document.cookie = `blacksmith_settings=${JSON.stringify(this.settings)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`
    },

    loadSettings() {
      const cookies = document.cookie.split('; ')
      const settingsCookie = cookies.find((c) => c.startsWith('blacksmith_settings='))
      if (settingsCookie) {
        try {
          const saved = JSON.parse(
            decodeURIComponent(settingsCookie.substring(settingsCookie.indexOf('=') + 1))
          )
          if (
            saved &&
            typeof saved === 'object' &&
            typeof saved.passwordLength === 'number' &&
            typeof saved.randomLength === 'boolean' &&
            typeof saved.minUppercase === 'number' &&
            typeof saved.minLowercase === 'number' &&
            typeof saved.minNumbers === 'number' &&
            typeof saved.minSpecial === 'number' &&
            typeof saved.includeLanguages === 'object'
          ) {
            this.settings = { ...this.settings, ...saved }
          } else {
            console.warn('Settings cookie structure invalid:', saved)
          }
        } catch (e) {
          console.error('Failed to load settings:', e)
        }
      }
    },

    resetSettings() {
      document.cookie = 'blacksmith_settings=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      this.settings = {
        includeLanguages: {
          english: true,
          german: true,
          viet: true,
          chinese: true,
          russian: true,
          numbers: true,
          specialchars: true
        },
        passwordLength: 16,
        randomLength: false,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSpecial: 1
      }
      this.saveSettings()
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

    async httpGet(url, returnHeaders) {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        if (returnHeaders) {
          return response
        } else {
          return await response.text()
        }
      } catch (error) {
        console.error('Fetch error:', error)
        throw error
      }
    },

    async getCommitsCount() {
      const firstCommit = await this.getFirstCommit()
      const compareUrl = `https://api.github.com/repos/${this.owner}/${this.repo}/compare/${firstCommit}...${this.sha}`
      const commitReq = await this.httpGet(compareUrl)
      const commitCount = JSON.parse(commitReq)['total_commits'] + 1
      this.commitCount = commitCount
    },

    async getFirstCommit() {
      const url = `https://api.github.com/repos/${this.owner}/${this.repo}/commits`
      const req = await this.httpGet(url, true)
      let firstCommitHash = ''
      const linkHeader = req.headers.get('Link')
      if (linkHeader) {
        const pageUrl = linkHeader.split(',')[1].split(';')[0].split('<')[1].split('>')[0]
        const reqLastCommit = await this.httpGet(pageUrl)
        const firstCommit = JSON.parse(reqLastCommit)
        firstCommitHash = firstCommit[firstCommit.length - 1]['sha']
      } else {
        const firstCommit = await req.json()
        firstCommitHash = firstCommit[firstCommit.length - 1]['sha']
      }
      return firstCommitHash
    }
  },

  async mounted() {
    this.loadSettings()
    this.fetchLatestRelease()
    await this.getCommitsCount()
  },

  watch: {
    settings: {
      handler() {
        this.saveSettings()
      },
      deep: true
    }
  }
}
</script>
