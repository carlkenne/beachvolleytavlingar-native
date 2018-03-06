import { _ } from 'lodash'
import { getNameForClass } from '../../../utils/classTypes'
import { getHrefByTitle, getDomParser } from '../../../utils/parser'

const getClassType = (links, data) => {
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

  const damerLink = getHrefByTitle(doc, 'Damer')
  const herrarLink = getHrefByTitle(doc, 'Herrar')
  return { herrarLink, damerLink }
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
      team: tds[1].textContent,
      id: index.toString()
    }))

  return {
    classType: getClassType(links, data),
    teams,
    top4Teams: _.take(teams, 4)
  }
}

const parseHTML = links => datas => ({
  results: [parse(links, datas[0]), parse(links, datas[1])]
})

export default parseHTML
