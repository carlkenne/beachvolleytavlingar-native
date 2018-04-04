import { combineEpics } from 'redux-observable'
import fetchTournamentListEpic from './tournamentList/epic'
import fetchTournamentScreenEpic from './tournamentScreen/epic'
import fetchAnmalningsListaEpic from './tournamentScreen/anmalningsListaTab/epic'
import fetchSpelschemaEpic from './tournamentScreen/spelschemaTab/epic'

export const rootEpics = combineEpics(
  fetchTournamentListEpic,
  fetchTournamentScreenEpic,
  fetchAnmalningsListaEpic,
  fetchSpelschemaEpic
)
