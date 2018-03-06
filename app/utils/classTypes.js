export const getNameForClass = (_class = 'Unknown') => {
  switch (_class) {
    case 'D': {
      return 'Damer'
    }
    case 'H': {
      return 'Herrar'
    }
    case 'M': {
      return 'Mixed'
    }
  }
  return _class
}
