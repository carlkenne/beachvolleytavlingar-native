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

export const getClassNames = () => [
  'Dam',
  'Herr',
  'Mixed',
  'V35+ D',
  'V35+ H',
  'V40+ D',
  'V40+ H',
  'V45+ H',
  'V45+ D',
  'Junior D',
  'Junior H',
  'U16 F',
  'U16 P',
  'U16 M',
  'U18 F',
  'U18 P',
  'U18 M'
]

//konverteringstabell för resultat eftersom querySelect inte stödjer siffror och mellanrum
export const getClassNameSelectors = () => [
  { selector: 'Damer', renamedSelector: 'Damer', displayName: 'Dam' },
  { selector: 'Herrar', renamedSelector: 'Herrar', displayName: 'Herr' },
  { selector: 'Mixed', renamedSelector: 'Mixed', displayName: 'Mixed' },
  {
    selector: 'V35+ Damer',
    renamedSelector: 'VESDamer',
    displayName: 'V35+ D'
  },
  {
    selector: 'V35+ Herrar',
    renamedSelector: 'VESHerrar',
    displayName: 'V35+ H'
  },
  {
    selector: 'V45+ Damer',
    renamedSelector: 'VFSDamer',
    displayName: 'V45+ D'
  },
  {
    selector: 'V45+ Herrar',
    renamedSelector: 'VFSHerrar',
    displayName: 'V45+ H'
  },
  {
    selector: 'V40+ Damer',
    renamedSelector: 'VFODamer',
    displayName: 'V40+ D'
  },
  {
    selector: 'V40+ Herrar',
    renamedSelector: 'VFOHerrar',
    displayName: 'V40+ H'
  },

  {
    selector: 'Junior Dam',
    renamedSelector: 'JuniorD',
    displayName: 'Junior D'
  },
  {
    selector: 'Junior Herr',
    renamedSelector: 'JuniorH',
    displayName: 'Junior H'
  },
  {
    selector: 'U16 Flickor',
    renamedSelector: 'UESFlickor',
    displayName: 'U16 F'
  },
  {
    selector: 'U16 Pojkar',
    renamedSelector: 'UESPojkar',
    displayName: 'U16 P'
  },
  { selector: 'U16 Mixed', renamedSelector: 'UESMixed', displayName: 'U16 M' },
  {
    selector: 'U18 Flickor',
    renamedSelector: 'UEAFlickor',
    displayName: 'U18 F'
  },
  {
    selector: 'U18 Pojkar',
    renamedSelector: 'UEAPojkar',
    displayName: 'U18 P'
  },
  { selector: 'U18 Mixed', renamedSelector: 'UEAMixed', displayName: 'U18 M' }
]

const getCodeForClass = className =>
  [className]
    .map(item => (item.startsWith('V35+ D') ? 'V35+ D' : item))
    .map(item => (item.startsWith('V35+ H') ? 'V35+ H' : item))
    .map(item => (item.startsWith('V40+ D') ? 'V40+ D' : item))
    .map(item => (item.startsWith('V40+ H') ? 'V40+ H' : item))
    .map(item => (item.startsWith('V45+ D') ? 'V45+ D' : item))
    .map(item => (item.startsWith('V45+ H') ? 'V45+ H' : item))
    .map(item => (item.startsWith('Junior D') ? 'Junior D' : item))
    .map(item => (item.startsWith('Junior H') ? 'Junior H' : item))
    .map(item => (item.startsWith('U16 P') ? 'U16 F' : item))
    .map(item => (item.startsWith('U16 F') ? 'U16 P' : item))
    .map(item => (item.startsWith('U16 M') ? 'U16 M' : item))
    .map(item => (item.startsWith('U18 P') ? 'U18 P' : item))
    .map(item => (item.startsWith('U18 F') ? 'U18 F' : item))
    .map(item => (item.startsWith('U18 M') ? 'U18 M' : item))[0]

// tournamentlist
export const parseClass = classCodeCSV =>
  classCodeCSV
    .split(',')
    .filter(item => item !== 'd')
    .filter(item => item !== 'h')
    .filter(item => item !== 'm')
    .filter(item => item !== '')
    .map(getCodeForClass)

export const getLevel = (level, classes, tournamentName) => {
  if (level) {
    return level
  }
  if (
    classes.find(
      className =>
        className.toLowerCase().includes('u18') ||
        className.toLowerCase().includes('junior') ||
        className.toLowerCase().includes('u16') ||
        className.toLowerCase().includes('mini')
    )
  ) {
    return 'Ungdomstävling'
  }
  if (
    classes.find(className => className.toLowerCase().includes('mix')) ||
    tournamentName.toLowerCase().includes('mix')
  ) {
    return 'Mixed'
  }

  if (tournamentName.toLowerCase().includes('grön')) {
    return 'Open Grön'
  }
  if (
    tournamentName.toLowerCase().includes('svart') ||
    name.toLowerCase().includes('open')
  ) {
    return 'Open Svart'
  }
  if (name.toLowerCase().includes('challenger')) {
    return 'Challenger'
  }
  if (
    name.toLowerCase().includes('ungdom') ||
    name.toLowerCase().includes('minior')
  ) {
    return 'Ungdomstävling'
  }
  if (name.toLowerCase().includes('veteran')) {
    return 'Veterantävling'
  }
  console.log('could not identify ', name)
  return 'Open Svart'
}
