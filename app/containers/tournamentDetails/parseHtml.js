import { _ } from 'lodash'
import { parseDate } from '../../utils/date'
import { getClassNames } from '../../utils/classTypes'
import { getDomParser } from '../../utils/parser'
import { getLocation } from './locations'

export const getExtended = (array, key, pos = 0, format = f => f) => {
  const result = _.find(array, obj => obj.key.startsWith(key))
  return result &&
    result.values &&
    result.values.length > pos &&
    result.values[pos] !== ''
    ? format(result.values[pos])
    : undefined
}

export const get = (array, key, _default = undefined) => {
  const result = getExtended(array, key)
  return result || _default
}

const getContact = (parsed, pos) => {
  const contact = {
    name: getExtended(parsed, 'Namn', pos),
    phone: getExtended(parsed, 'Telefon', pos),
    email: getExtended(parsed, 'Epost', pos),
    id: pos
  }
  return contact.name ? [contact] : []
}

const getContacts = parsed => {
  const c1 = getContact(parsed, 0)
  const c2 = getContact(parsed, 1)
  return [...c1, ...c2]
}

const getClass = (parsed, className) => {
  const amount = get(parsed, className)

  return amount
    ? {
        className,
        amount: Number.parseInt(amount) || undefined,
        price: getExtended(parsed, className, 2, value =>
          value.replace('.00', '')
        )
      }
    : undefined
}

const getClasses = parsed =>
  getClassNames()
    .map(className => getClass(parsed, className))
    .filter(classObj => classObj !== undefined)

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
  const arena = get(parsed, 'Spelplats/hall')
  const classes = getClasses(parsed)
  const tournamentDetails = {
    arena,
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
    info: get(parsed, 'Övrig info', ''),
    deadline: parseDate(get(parsed, 'Sista anmäliningsdag')),
    classes,
    contacts: getContacts(parsed),
    club,
    location: getLocation(club, arena)
  }

  console.log('tournamentDetails: ', tournamentDetails)
  return { tournamentDetails }
}

export default parseHTML
