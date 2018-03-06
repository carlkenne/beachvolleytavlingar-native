import { combineEpics } from 'redux-observable'
import fetchTournamentListEpic from './tournamentList/epic'
import fetchTournamentDetailsEpic from './tournamentDetails/epic'
import fetchAnmalningsListaEpic from './tournamentDetails/anmalningsListaTab/epic'
import fetchSpelschemaEpic from './tournamentDetails/spelschemaTab/epic'

export const rootEpics = combineEpics(
  fetchTournamentListEpic,
  fetchTournamentDetailsEpic,
  fetchAnmalningsListaEpic,
  fetchSpelschemaEpic
)
