# 🔨 Blacksmith - Advanced Password Generator

<div align="center">

![Blacksmith Logo](https://img.shields.io/badge/🔨-Blacksmith-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.3.0-green?style=for-the-badge)
![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![License](https://img.shields.io/badge/license-GPLv3-purple?style=for-the-badge)

### A sophisticated, multilingual password generator with advanced security analysis

[Features](#🌟-features) • [Installation](#🚀-quick-start) • [Contributing](#🤝-contributing)

</div>

## 🌟 Features

### 🔐 **Advanced Password Generation**

- **Multilingual Support**: Generate passwords using English, German, Vietnamese, Chinese, and Russian character sets
- **Customizable Length**: 8-128 characters with random length option
- **Minimum Requirements**: Set minimum counts for uppercase, lowercase, numbers, and special characters
- **Smart Character Distribution**: Ensures requirements are met while maintaining randomness

### 🛡️ **Sophisticated Security Analysis**

- **Advanced Strength Algorithm**: 7-tier strength assessment (Very Weak to Exceptional)
- **Pattern Detection**: Identifies repeated characters, sequential patterns, and keyboard sequences
- **Entropy Calculation**: Mathematical analysis of password randomness
- **Real-time Feedback**: Detailed strengths and weaknesses analysis

### 🎨 **User Experience**

- **Retro Windows 98 Interface**: Built with [98.css](https://jdan.github.io/98.css/) for nostalgic design
- **Visual Strength Indicator**: Progress bar and color-coded strength display
- **One-Click Copy**: Secure clipboard integration
- **Persistent Settings**: Automatically saves your preferences
- **Responsive Design**: Works on desktop and mobile devices

### 🌍 **International Ready**

- Support for multiple language character sets
- Unicode and international character bonuses
- Culturally diverse password generation

## 📊 Security Strength Levels

| Level          | Score   | Color         | Description               |
| -------------- | ------- | ------------- | ------------------------- |
| 🔴 Very Weak   | 0-14%   | Red           | Extremely poor security   |
| 🟠 Weak        | 15-24%  | Dark Red      | Poor security             |
| 🟡 Fair        | 25-39%  | Orange        | Weak security             |
| 🟢 Good        | 40-54%  | Yellow-Orange | Moderately secure         |
| 🟢 Strong      | 55-69%  | Light Green   | Secure password           |
| 💚 Very Strong | 70-84%  | Green         | Very secure password      |
| ⭐ Exceptional | 85-100% | Bright Green  | Extremely secure password |

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/r1c0n/blacksmith.git
   cd blacksmith
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 🛠️ Development

### Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build for production                     |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Lint code with ESLint                    |
| `npm run format`  | Format code with Prettier                |

### Project Structure

```
.
├── src/
│   ├── assets/
│   │   ├── bg.png                    # Windows 98 desktop background image
│   │   └── main.css                  # Custom CSS styles
│   ├── components/
│   │   ├── PasswordGenerator.vue     # Main password generation component
│   │   └── TitleBar.vue             # Windows 98-style title bar component
│   ├── lang/
│   │   ├── chinese.js               # Chinese character set for password generation
│   │   ├── english.js               # English alphabet character set
│   │   ├── german.js                # German alphabet with umlauts and special characters
│   │   ├── russian.js               # Cyrillic alphabet character set
│   │   └── viet.js                  # Vietnamese character set
│   ├── App.vue                      # Root Vue component that orchestrates the application
│   ├── characters.js                # Central character set w/ special chars and numbers
│   └── main.js                      # Application entry point and Vue app initialization
├── index.html                       # Main HTML template with Windows 98 theming
├── package.json                     # NPM dependencies and project configuration
└── README.md                        # Project documentation (this file!)
```

### Tech Stack

- **Framework**: [Vue.js 3](https://vuejs.org/) - Progressive JavaScript framework
- **Build Tool**: [Vite](https://vitejs.dev/) - Next generation frontend tooling
- **Styling**: [98.css](https://jdan.github.io/98.css/) - Windows 98 CSS framework
- **HTTP Client**: [Axios](https://axios-http.com/) - Promise based HTTP client
- **Linting**: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)

## 🔧 Configuration

### Password Settings

The application supports extensive customization:

- **Length**: 8-128 characters (or random length 56-128)
- **Character Types**: Toggle inclusion of different character sets
- **Minimum Requirements**: Set minimum counts for each character type
- **Language Sets**: Enable/disable specific language character sets

### Advanced Security Features

The password strength algorithm evaluates:

- **Length Analysis**: Progressive scoring for different lengths
- **Character Diversity**: Variety of character types used
- **Pattern Detection**: Repeated chars, sequences, keyboard patterns
- **Entropy Calculation**: Mathematical randomness measurement
- **International Support**: Bonus for non-ASCII characters

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**

4. **Run linting**

   ```bash
   npm run lint
   ```

5. **Commit your changes**

   ```bash
   git commit -m "Add amazing feature"
   ```

6. **Push to the branch**

   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**

### Development Guidelines

- Follow Vue.js best practices
- Maintain the Windows 98 aesthetic
- Update documentation for new features

## 📄 License

This project is licensed under the GNU GPL-3.0 license - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [98.css](https://jdan.github.io/98.css/) for the amazing Windows 98 styling
- [Vue.js](https://vuejs.org/) team for the excellent framework
- [Vite](https://vitejs.dev/) for the lightning-fast build tool
- All contributors and security researchers who make password security better

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/r1c0n/blacksmith/issues)
- **Security**: [Email Me](mailto://recon@mail.recon.best) to report security vulnerabilities.

---

<div align="center">

**Made with ❤️ by [r1c0n](https://github.com/r1c0n)**

⭐ **Star this repository if you find it helpful!**

</div>
