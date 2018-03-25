import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs'
import parse from './parseHtml'
import mockedData from './mocks/vis_innbydelse_php'
import { getTournamentDetailsUrl } from '../../utils/config'
import DEV_MODE from '../../utils/devmode'

export const FETCH_TOURNAMENT_DETAILS_SUCCESS =
  'tournamentDetails/FETCH_TOURNAMENT_DETAILS_SUCCESS'
export const FETCH_TOURNAMENT_DETAILS_FAILED =
  'tournamentDetails/FETCH_TOURNAMENT_DETAILS_FAILED'
export const FETCH_TOURNAMENT_DETAILS =
  'tournamentDetails/FETCH_TOURNAMENT_DETAILS'

export const fetchTournamentDetails = id => ({
  type: FETCH_TOURNAMENT_DETAILS,
  id
})

const dispatchLoaded = payload => ({
  type: FETCH_TOURNAMENT_DETAILS_SUCCESS,
  ...payload
})

const getData = id =>
  DEV_MODE
    ? Observable.of({ response: mockedData })
    : ajax({
        // console.log(getTournamentDetailsUrl(id), id) ||
        url: getTournamentDetailsUrl(id),
        responseType: 'text'
      })

const fetchTournamentListEpic = action$ =>
  action$
    .filter(action => action.type === FETCH_TOURNAMENT_DETAILS)
    .debug('get details')
    .mergeMap(action =>
      getData(action.id)
        .map(parse)
        .map(dispatchLoaded)
        .catch(error => {
          console.warn('error in epic: ', error)
          Observable.of({
            type: FETCH_TOURNAMENT_DETAILS_FAILED,
            payload: error,
            error: true
          })
        })
    )

export default fetchTournamentListEpic
