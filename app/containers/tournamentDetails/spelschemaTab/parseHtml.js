import { _ } from 'lodash'
import { getNameForClass } from '../../../utils/classTypes'
import { getHrefByTitle, getDomParser } from '../../../utils/parser'

const getClass = (links, data) => {
  if (data.request.url.includes(links.herrarLink)) {
    return getNameForClass('H')
  }
  if (data.request.url.includes(links.damerLink)) {
    return getNameForClass('D')
  }
  return getNameForClass()
}

export const parseKlassLinks = data => {
  const doc = getDomParser(data.response)
  const links = [
    'Damer',
    'Herrar',
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

const parse = (links, data) => {
  const doc = getDomParser(data.response)
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
    class: getClass(links, data),
    teams,
    top4Teams: _.take(teams, 4)
  }
}

const parseHTML = links => datas => ({
  results: [parse(links, datas[0]), parse(links, datas[1])]
})

export default parseHTML
