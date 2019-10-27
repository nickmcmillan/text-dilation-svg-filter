
function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function distanceXY(mouseX, mouseY, startingLeft, startingTop) {
  return Math.sqrt(Math.pow(startingTop - mouseY, 2) + Math.pow(startingLeft - mouseX, 2)) || 0
}

function calcStroke({
  x,
  y,
  ii,
  spread,
  maxFat,
  lineWidth,
  componentHeight,
  lineCount,
  characters,
}) {
  
  const mappedX = map_range(x, 0, lineWidth, 0, characters.length)
  const mappedY = map_range(y, 0, componentHeight, 0, 30)
  
  const fromMouse = distanceXY(mappedX, mappedY, ii, lineCount * 10)
  
  const mapMouse = map_range(fromMouse, 0, spread, maxFat, 0)
  const clamp = Math.min(Math.max(0, mapMouse), maxFat)
  // console.log({ clamp })
  const rounded = Math.round(clamp * 100 + Number.EPSILON) / 100
  return rounded
}

export default calcStroke
