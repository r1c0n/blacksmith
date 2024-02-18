export const english = {
  words: ['apple', 'house', 'car', 'table', 'cake', 'chair', 'flower', 'window', 'garden', 'water'],
  letters: Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode('A'.charCodeAt(0) + i).toLowerCase()
  )
}
