import { _ } from 'lodash'
import { parseDate } from '../../utils/date'
import { getDomParser } from '../../utils/parser'

const getSectionHeaders = year => {
  if (year === '2017') {
    return {
      tp01: {
        name: 'TP 01',
        number: 1,
        date: parseDate('1 jan 2017', '2 april 2017')
      },
      tp02: {
        name: 'TP 02',
        number: 2,
        date: parseDate('3 april 2017', '21 may 2017')
      },
      tp03: {
        name: 'TP 03',
        number: 3,
        date: parseDate('22 may 2017', '4 jun 2017')
      },
      tp04: {
        name: 'TP 04',
        number: 4,
        date: parseDate('5 jun 2017', '11 jun 2017')
      },
      tp05: {
        name: 'TP 05',
        number: 5,
        date: parseDate('12 jun 2017', '25 jun 2017')
      },
      tp06: {
        name: 'TP 06',
        number: 6,
        date: parseDate('26 jun 2017', '2 jul 2017')
      },
      tp07: {
        name: 'TP 07',
        number: 7,
        date: parseDate('3 jul 2017', '9 jul 2017')
      },
      tp08: {
        name: 'TP 08',
        number: 8,
        date: parseDate('10 jul 2017', '16 jul 2017')
      },
      tp09: {
        name: 'TP 09',
        number: 9,
        date: parseDate('17 jul 2017', '23 jul 2017')
      },
      tp10: {
        name: 'TP 10',
        number: 10,
        date: parseDate('24 jul 2017', '30 jul 2017')
      },
      tp11: {
        name: 'TP 11',
        number: 11,
        date: parseDate('31 jul 2017', '6 aug 2017')
      },
      tp12: {
        name: 'TP 12',
        number: 12,
        date: parseDate('7 aug 2017', '13 aug 2017')
      },
      tp13: {
        name: 'TP 13',
        number: 13,
        date: parseDate('14 aug 2017', '20 aug 2017')
      },
      tp14: {
        name: 'TP 14',
        number: 14,
        date: parseDate('21 aug 2017', '3 sep 2017')
      },
      tp15: {
        name: 'TP 15',
        number: 15,
        date: parseDate('4 sep 2017', '15 oct 2017')
      },
      tp16: {
        name: 'TP 16',
        number: 16,
        date: parseDate('16 oct 2017', '31 dec 2017')
      }
    }
  }
}

class Name {
  constructor(name) {
    this.name = name
  }

  replace(key, replacement) {
    this.name = this.name.replace(new RegExp(key, 'g'), replacement || '')
    return this
  }

  getName() {
    return this.name.trim()
  }
}

const parseTournamentName = name =>
  new Name(`${name} `)
    .replace('CH1', '')
    .replace('CH2', '')
    .replace('08 B', 'BBB')
    .replace('Svart ', '')
    .replace('Sv ', '')
    .replace('\\(svart\\)', 'Open')
    .replace('\\(grön\\)', 'Open Grön')
    .replace('\\(mixed\\)', 'Mixed')
    .replace('\\(ch\\)', 'Challenger')
    .replace('svart ', '')
    .replace('lö ', '')
    .replace('Lö ', '')
    .replace('Må ', '')
    .replace('Sö ', '')
    .replace('sö ', '')
    .replace('sön ', '')
    .replace(' tor ', '')
    .replace(' den ', ' ')
    .replace('Svart', '')
    .replace('svart', '')
    .replace(' mix ', ' Mixed ')
    .replace(' MIX', ' Mixed')
    .replace('Open Mix ', 'Mixed ')
    .replace('Mixed Open', 'Mixed')
    .replace('Open Mix', 'Mixed')
    .replace(' Dam/Herr', '')
    .replace('\\(open sv\\)', 'Open')
    .replace(' open', ' Open')
    .replace(' challenger', ' Challenger')
    .replace(' mixed', ' Mixed')
    .replace('Garantiplats', '')
    .replace('Maj ', ' ')
    .replace('maj ', ' ')
    .replace('Juni ', ' ')
    .replace('Jun ', ' ')
    .replace('jun ', ' ')
    .replace('sep', '')
    .replace('Sep', '')
    .replace('Juli', '')
    .replace('juli', '')
    .replace('aug', '')
    .replace('0', '')
    .replace('1', '')
    .replace('2', '')
    .replace('3', '')
    .replace('4', '')
    .replace('5', '')
    .replace('6', '')
    .replace('7', '')
    .replace('8', '')
    .replace('9', '')
    .replace('\\(\\)', '')
    .replace(' v ', ' ')
    .replace(' TP', '')
    .replace('\\)', '')
    .replace('\\(', '')
    .replace('\\+', '')
    .replace('\\/', '')
    .replace(' , ', ' ')
    .replace('BBB', '08 B')
    .replace('  ', ' ')
    .getName()

const parseClass = className =>
  className
    .split(',')
    .map(item => item.replace(/\s/g, '').toLowerCase())
    .filter(item => item !== 'd')
    .filter(item => item !== 'h')
    .map(item => (item.startsWith('v35+d') ? 'v35+dam' : item))
    .map(item => (item.startsWith('v35+h') ? 'v35+herr' : item))
    .map(item => (item.startsWith('v40+d') ? 'v40+dam' : item))
    .map(item => (item.startsWith('v40+h') ? 'v40+herr' : item))
    .map(item => (item.startsWith('v45+d') ? 'v45+dam' : item))
    .map(item => (item.startsWith('v45+h') ? 'v45+herr' : item))

const getId = node => {
  const aTag = node.getElementsByTagName('a')
  if (aTag.length) {
    return aTag[0].getAttribute('href').replace('vis_innbydelse.php?ib_id=', '')
  }
  return ''
}

const getTp = node =>
  node.textContent
    .split(' ')
    .join('')
    .toLowerCase()

const getQualifier = text => {
  if (text.indexOf('CH1') > -1 || text.indexOf('CH 1') > -1) {
    return 'CH1'
  }
  if (text.indexOf('CH2') > -1 || text.indexOf('CH 2') > -1) {
    return 'CH2'
  }
  return ''
}

const getActive = node => node.getElementsByTagName('a').length > 0
const getType = node => {
  const rawType = node.childNodes[10].textContent.trim()
  if (rawType) {
    return rawType
  }
  const name = node.childNodes[8].textContent
  if (name.toLowerCase().includes('mix')) {
    return 'Mixed'
  }
  if (name.toLowerCase().includes('grön')) {
    return 'Open Grön'
  }
  if (
    name.toLowerCase().includes('svart') ||
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

const parseHTML = data => {
  console.log('data: ', data)
  const doc = getDomParser(data.response)

  console.log('doc: ', doc)

  const rows = doc
    .querySelect('.maincontent tr')
    .filter(row => row.attributes.length > 0)
    .map(row => {
      console.log('row: ', row)
      return {
        tp: getTp(row.childNodes[4]),
        adress: '',
        club: row.childNodes[6].textContent,
        qualifier: getQualifier(row.childNodes[8].textContent),
        name: parseTournamentName(row.childNodes[8].textContent),
        originalName: row.childNodes[8].textContent,
        type: getType(row),
        class: parseClass(row.childNodes[12].textContent),
        id: getId(row.childNodes[8]),
        date: parseDate(
          row.childNodes[0].textContent,
          row.childNodes[2].textContent
        ),
        active: getActive(row.childNodes[8])
      }
    })
  console.log(
    'raw list',
    doc
      .querySelect('.maincontent tr')
      .filter(row => row.attributes.length > 0)[1]
  )
  const groups = _.groupBy(rows, 'tp')
  const types = new Set(rows.map(r => r.type).filter(r => r !== ''))

  return {
    sectionHeaders: getSectionHeaders('2017'),
    tournamentData: groups,
    types: [...types]
  }
}

export default parseHTML
