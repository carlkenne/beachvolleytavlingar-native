import { _ } from 'lodash'
import { getHrefByTitle, getDomParser } from '../../../utils/parser'

export const parseKlassLinks = data => {
  const doc = getDomParser(data.response)
  console.log('data.response: ', data)
  const links = [
    'Damer',
    'Herrar',
    'Mixed',
    'V35+ H', // check this
    'V35+ D', // check this
    'V40+ H', // check this
    'V40+ D', // check this
    'V45+ H', // check this
    'V45+ D' // check this
  ]
    .map(className => ({
      url: getHrefByTitle(doc, className),
      className
    }))
    .filter(link => link.url !== '')

  return links
}

const getTeam = teamName => {
  // sometimes teamnames are duplicated
  const halfTeam = teamName.substring(teamName.length / 2)
  if (teamName === `${halfTeam}${halfTeam}`) {
    return halfTeam
  }
  return teamName
}

const parse = data => {
  console.log('data: ', data)
  const doc = getDomParser(data.response.response)
  const tables = doc.querySelect(`tbody`)

  const table = tables
    .filter(
      t =>
        _.get(t, 'childNodes[1].childNodes[1].firstChild.nodeValue') ===
        'Position'
    )
    .find(
      t =>
        _.get(t, 'childNodes[1].childNodes[3].firstChild.nodeValue') ===
        'Lagnavn'
    )

  const teams = _.drop(table.querySelect('tr'), 1)
    .map(row => row.querySelect('td'))
    .map((tds, index) => ({
      position: tds[0].textContent,
      team: getTeam(tds[1].textContent),
      id: index.toString()
    }))

  return {
    className: data.link.className,
    teams,
    top4Teams: _.take(teams, 4)
  }
}

const parseHTML = datas => ({
  results: datas.map(parse)
})

export default parseHTML
