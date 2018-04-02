import { _ } from 'lodash'
import { parseDate } from '../../utils/date'
import { parseClass, getLevel } from '../../utils/classTypes'
import { getDomParser, getAttribute, getText } from '../../utils/parser'

const getSectionHeaders = year => {
  if (year === '2017') {
    return {
      tp01: {
        name: 'TP 01',
        number: 1,
        date: parseDate('2017.01.01', '04.02')
      },
      tp02: {
        name: 'TP 02',
        number: 2,
        date: parseDate('2017.03.04', '05.21')
      },
      tp03: {
        name: 'TP 03',
        number: 3,
        date: parseDate('2017.05.22', '06.04')
      },
      tp04: {
        name: 'TP 04',
        number: 4,
        date: parseDate('2017.06.05', '06.11')
      },
      tp05: {
        name: 'TP 05',
        number: 5,
        date: parseDate('2017.06.12', '06.25')
      },
      tp06: {
        name: 'TP 06',
        number: 6,
        date: parseDate('2017.06.26', '07.02')
      },
      tp07: {
        name: 'TP 07',
        number: 7,
        date: parseDate('2017.07.03', '07.09')
      },
      tp08: {
        name: 'TP 08',
        number: 8,
        date: parseDate('2017.07.10', '07.16')
      },
      tp09: {
        name: 'TP 09',
        number: 9,
        date: parseDate('2017.07.17', '07.23')
      },
      tp10: {
        name: 'TP 10',
        number: 10,
        date: parseDate('2017.07.24', '07.30')
      },
      tp11: {
        name: 'TP 11',
        number: 11,
        date: parseDate('2017.07.31', '08.06')
      },
      tp12: {
        name: 'TP 12',
        number: 12,
        date: parseDate('2017.08.07', '08.13')
      },
      tp13: {
        name: 'TP 13',
        number: 13,
        date: parseDate('2017.08.14', '08.20')
      },
      tp14: {
        name: 'TP 14',
        number: 14,
        date: parseDate('2017.08.21', '09.03')
      },
      tp15: {
        name: 'TP 15',
        number: 15,
        date: parseDate('2017.09.04', '10.15')
      },
      tp16: {
        name: 'TP 16',
        number: 16,
        date: parseDate('2017.10.16', '12.31')
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
    .replace('U20', 'UTJUGO')
    .replace('U18', 'UARTON')
    .replace('U16', 'USEXTON')
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
    .replace('UTJUGO', 'U20')
    .replace('UARTON', 'U18')
    .replace('USEXTON', 'U16')
    .replace('  ', ' ')
    .getName()

const getId = aTags => {
  if (aTags.length) {
    return getAttribute(aTags[0], 'href').replace(
      'vis_innbydelse.php?ib_id=',
      ''
    )
  }
  return ''
}

const getTp = nodeText =>
  nodeText
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

const parseHTML = data => {
  const parser = getDomParser(data.response)

  console.log('doc: ', parser)

  const trList = parser.querySelect('.maincontent tr')
  const rows = trList.filter(row => row.attrs.length > 0).map(row => {
    // console.log('row: ', row)
    const classes = parseClass(getText(row.childNodes[12]))
    return {
      tp: getTp(getText(row.childNodes[4])),
      adress: '',
      club: getText(row.childNodes[6]),
      qualifier: getQualifier(getText(row.childNodes[8])),
      name: parseTournamentName(getText(row.childNodes[8])),
      originalName: getText(row.childNodes[8]),
      type: getLevel(
        getText(row.childNodes[10]),
        classes,
        getText(row.childNodes[8])
      ),
      class: classes,
      id: getId(parser.querySelect('a', row.childNodes[8])),
      date: parseDate(getText(row.childNodes[0]), getText(row.childNodes[2])),
      active: parser.querySelect('a', row.childNodes[8]).length > 0
    }
  })

  console.log(rows)
  console.log('raw list', trList.filter(row => row.attrs.length > 0)[1])
  const groups = _.groupBy(rows, 'tp')
  const types = new Set(rows.map(r => r.type).filter(r => r !== ''))

  return {
    sectionHeaders: getSectionHeaders('2017'),
    tournamentData: groups,
    types: [...types]
  }
}

export default parseHTML
