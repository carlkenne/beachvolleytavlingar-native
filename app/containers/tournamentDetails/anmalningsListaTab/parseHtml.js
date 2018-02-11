import { DOMParser } from 'react-native-html-parser'
import { _ } from 'lodash'

const getNameForClass = _class => {
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

const parseHTML = data => {
  console.log('data: ', data)
  const doc = new DOMParser({
    locator: {},
    errorHandler: {
      warning: w => console.log(w), // eslint-disable-line
      error: e => console.log(e), // eslint-disable-line
      fatalError: fe => console.log(fe), // eslint-disable-line
    },
  }).parseFromString(data.response, 'text/html')
  console.log('data: ', data)
  const rows = doc.querySelect('table tr')

  console.log(
    'rows: ',
    rows.map(r => r.querySelect('td').map(td => td.textContent)),
  )

  const allTeams = _.drop(rows, 1)
    .map(r => r.querySelect('td').map(td => td.textContent))
    .filter(arr => arr.length === 8)
    .map(arr => ({
      name: arr[0].trim(),
      club: arr[1],
      classType: arr[2],
      points: Number(arr[5]),
      ok: arr[6],
    }))

  console.log('allTeams: ', _.groupBy(allTeams, 'classType'))
  const groups = _.groupBy(allTeams, 'classType')
  const classes = _.keys(groups).map(key => ({
    name: getNameForClass(key),
    teams: _.orderBy(groups[key], 'points', 'desc').map((team, index) => {
      team.rank = index + 1
      return team
    }),
  }))

  console.log('classes: ', classes)
  return {
    classes,
  }
}

export default parseHTML
