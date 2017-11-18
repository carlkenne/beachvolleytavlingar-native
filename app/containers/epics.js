import { combineEpics } from 'redux-observable'
import fetchTournamentListEpic from './tournamentList/epic'

export const rootEpics = combineEpics(fetchTournamentListEpic)
