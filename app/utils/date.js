import moment from 'moment'

const getSafeDate = dateString => new Date(dateString)

export const parseDate = (fromString, toString) => {
  const from = getSafeDate(fromString)
  const to =
    toString.split('.').length === 3
      ? getSafeDate(toString)
      : getSafeDate(toString + '.' + from.getFullYear())
  if (fromString.indexOf(toString) === -1) {
    console.log(fromString)
    console.log(toString)
  }
  return {
    from,
    to,
    text:
      moment(from).format('ddd, D MMM') +
      (fromString.indexOf(toString) === -1
        ? ' - ' + moment(to).format('ddd, D MMM')
        : ''),
    duration: moment(from).format('D MMM') + ' - ' + moment(to).format('D MMM'),
  }
}
