import { english } from './lang/english'
import { german } from './lang/german'
import { dutch } from './lang/dutch'
import { chinese } from './lang/chinese'
import { russian } from './lang/russian'
import { viet } from './lang/viet'

export const languages = {
  words: {
    english: english.words,
    german: german.words,
    dutch: dutch.words,
    chinese: chinese.words,
    russian: russian.words,
    viet: viet.words
  },
  letters: {
    english: english.letters,
    german: german.letters,
    dutch: dutch.letters,
    chinese: chinese.letters,
    russian: russian.letters,
    viet: viet.letters
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
