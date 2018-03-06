import PropTypes from 'prop-types'

export const teamShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  club: PropTypes.string.isRequired
})

export const dateShape = PropTypes.shape({
  from: PropTypes.shape().isRequired,
  to: PropTypes.shape().isRequired,
  getDuration: PropTypes.func.isRequired,
  getDetailedDuration: PropTypes.func.isRequired
})

export const tournamentDetailsShape = PropTypes.shape({
  date: dateShape.isRequired,
  deadline: dateShape.isRequired,
  arena: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string,
      email: PropTypes.string
    })
  ).isRequired,
  info: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  location: PropTypes.shape({
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  noOfDam: PropTypes.string,
  priceDam: PropTypes.string,
  noOfHerr: PropTypes.string,
  priceHerr: PropTypes.string,
  paymentInfo: PropTypes.string,
  registrationLink: PropTypes.string,
  setServerSessionCookieUrl: PropTypes.string,
  resultatLink: PropTypes.string,
  table: PropTypes.string
})
