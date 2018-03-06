import { _ } from 'lodash'
import { parseDate } from '../../utils/date'
import { getDomParser } from '../../utils/parser'
import { getLocation } from './locations'

export const get = (array, key, pos = 0, format = f => f) => {
  const result = _.find(array, obj => obj.key.startsWith(key))
  return result &&
    result.values &&
    result.values.length > pos &&
    result.values[pos] !== ''
    ? format(result.values[pos])
    : undefined
}

const getContact = (parsed, pos) => {
  const contact = {
    name: get(parsed, 'Namn', pos),
    phone: get(parsed, 'Telefon', pos),
    email: get(parsed, 'Epost', pos),
    id: pos
  }
  return contact.name ? [contact] : []
}

const extractOnClickLink = doc => {
  const link = _.flatMap(
    doc
      .querySelect('input[onClick]')
      .map(tag => Array.from(tag.attributes).map(attr => attr.value || ''))
  ).find(attr => attr.includes('window.open("../pamelding/redirect.php'))
  return link.replace('window.open("..', '').replace('", "_blank")', '')
}

const parseHTML = data => {
  const doc = getDomParser(data.response)

  const iterateSiblings = el => {
    if (el) {
      return [el.textContent.trim(), ...iterateSiblings(el.nextSibling)]
    }
    return []
  }

  const parsed = doc.querySelect('td[class="uh"]').map(uhTag => ({
    key: uhTag.textContent.trim(),
    values: iterateSiblings(uhTag.nextSibling)
  }))
  console.log('parsed: ', parsed)

  const club = get(parsed, 'Arrangör')

  const tournamentDetails = {
    arena: get(parsed, 'Spelplats/hall'),
    resultatLink: get(parsed, 'Spelschema och resultat'),
    registrationLink: get(parsed, 'Anmälan'),
    link: 'to me',
    table: 'table',
    setServerSessionCookieUrl: extractOnClickLink(doc),
    date: parseDate(
      get(parsed, 'Från:') + ' ' + get(parsed, 'kl:').replace('.', ':'),
      get(parsed, 'Till:') + ' ' + get(parsed, 'ca kl:').replace('.', ':')
    ),
    paymentInfo: get(parsed, 'Inbetalningsinfo'),
    info: get(parsed, 'Övrig info'),
    deadline: parseDate(get(parsed, 'Sista anmäliningsdag')),
    noOfDam: get(parsed, 'Dam'),
    noOfHerr: get(parsed, 'Herr'),
    priceDam: get(parsed, 'Dam', 2, value => value.replace('.00', '')),
    priceHerr: get(parsed, 'Herr', 2, value => value.replace('.00', '')),
    contacts: [...getContact(parsed, 0), ...getContact(parsed, 1)],
    location: getLocation(club)
  }

  console.log('tournamentDetails: ', tournamentDetails)
  return { tournamentDetails }
}

export default parseHTML
