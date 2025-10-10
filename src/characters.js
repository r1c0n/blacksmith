import { english } from './lang/english'
import { german } from './lang/german'
import { chinese } from './lang/chinese'
import { russian } from './lang/russian'
import { viet } from './lang/viet'

export const languages = {
  letters: {
    english: english.letters,
    german: german.letters,
    chinese: chinese.letters,
    russian: russian.letters,
    viet: viet.letters
  },
  numbers: Array.from({ length: 10 }, (_, i) => String(i)),
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
