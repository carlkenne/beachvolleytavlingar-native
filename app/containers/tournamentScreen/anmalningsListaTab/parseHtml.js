import { _ } from 'lodash'
import { getNameForClass } from '../../../utils/classTypes'
import { getDomParser, getText } from '../../../utils/parser'

const parseHTML = data => {
  const doc = getDomParser(data.response)
  const rows = doc.querySelect('table tr')

  const allTeams = _.drop(rows, 1)
    .map(r => doc.querySelect('td', r).map(getText))
    .filter(arr => arr.length === 8)
    .map(arr => ({
      id: arr[0].trim(),
      name: arr[0].trim(),
      adress: '',
      club: arr[1],
      class: arr[2],
      points: Number(arr[5]),
      ok: arr[6]
    }))

  console.log('allTeams: ', _.groupBy(allTeams, 'class'))
  const groups = _.groupBy(allTeams, 'class')
  const classes = _.keys(groups).map(key => ({
    name: getNameForClass(key),
    teams: _.orderBy(groups[key], 'points', 'desc').map((team, index) => {
      team.rank = index + 1
      return team
    })
  }))

  console.log('classes: ', classes)
  return {
    classes
  }
}

export default parseHTML
