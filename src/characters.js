import { english } from './lang/english'
import { german } from './lang/german'

export const languages = {
  words: {
    english: english.words,
    german: german.words,
    dutch: ['Huis', 'Appel', 'Auto', 'Tafel', 'Taart', 'Stoel', 'Bloem', 'Raam', 'Tuin', 'Water'],
    chinese: ['苹果', '家', '汽车', '桌子', '蛋糕', '椅子', '花', '窗户', '花园', '水'],
    russian: ['Дом', 'Яблоко', 'Машина', 'Стол', 'Пирог', 'Стул', 'Цветок', 'Окно', 'Сад', 'Вода'],
    viet: ['Nhà', 'Quả táo', 'Xe hơi', 'Bàn', 'Bánh', 'Ghế', 'Hoa', 'Cửa sổ', 'Vườn', 'Nước']
  },
  letters: {
    english: english.letters,
    german: german.letters,
    dutch: ['ä', 'Ä', 'ë', 'Ë', 'ï', 'Ï', 'ö', 'Ö', 'ü', 'Ü', 'ÿ', 'Ÿ'],
    viet: [
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
    ],
    chinese: ['龘', '龍', '齉', '龠', '龔', '龖', '龍', '龎', '龑', '龏']
  },
  numbers: Array.from({ length: 10 }, () => Math.floor(Math.random() * 101)),
  specialCharacters: [
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
}
