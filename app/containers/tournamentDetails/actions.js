import * as types from './constants'

export const getTournamentDetails = id => ({
  type: types.GET_TOURNAMENT_DETAILS,
  id,
})
