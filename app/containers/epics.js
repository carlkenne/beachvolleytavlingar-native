import { combineEpics } from 'redux-observable'
import fetchTournamentListEpic from './tournamentList/epic'
import fetchTournamentDetailsEpic from './tournamentDetails/epic'

export const rootEpics = combineEpics(
  fetchTournamentListEpic,
  fetchTournamentDetailsEpic,
)
