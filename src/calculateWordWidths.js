// https://codepen.io/techniq/pen/rLXwJJ
function calculateWordWidths(children, style, className) {

  // Calculate length of each word to be used to determine number of words per line
  const words = children.split(/\s+/)
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')

  // if (className) {
  //   text.classList.add(className)
  // }

  Object.assign(text.style, style)

  // console.log(text)
  
  
  svg.appendChild(text)
  document.body.appendChild(svg)

  const wordsWithComputedWidth = words.map(word => {
    text.textContent = word
    return { word, width: text.getComputedTextLength() }
  })
  
  text.textContent = '\u00A0' // Unicode space
  const spaceWidth = text.getComputedTextLength()

  // document.body.removeChild(svg)

  return { wordsWithComputedWidth, spaceWidth }
}

export default calculateWordWidths
