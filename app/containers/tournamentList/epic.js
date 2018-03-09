import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs'
import parse from './parseHtml'
import mockedData from './mocks/terminliste_php'
import { getTournamentListUrl } from '../../utils/config'
import DEV_MODE from '../../utils/devmode'

const FETCH_USER_CANCELLED = 'FETCH_USER_CANCELLED'
export const FETCH_TOURNAMENTLIST_SUCCESS =
  'tournamentList/FETCH_TOURNAMENTLIST_SUCCESS'
export const FETCH_TOURNAMENTLIST_FAILED =
  'tournamentList/FETCH_TOURNAMENTLIST_FAILED'
export const FETCH_TOURNAMENTLIST = 'tournamentList/FETCH_TOURNAMENTLIST'

const dispatchLoaded = payload => ({
  type: FETCH_TOURNAMENTLIST_SUCCESS,
  ...payload
})

const getData = () =>
  DEV_MODE
    ? Observable.of({ response: mockedData })
    : ajax({
        url: getTournamentListUrl(),
        responseType: 'text'
      })

const fetchTournamentListEpic = action$ =>
  action$
    .filter(action => action.type === FETCH_TOURNAMENTLIST)
    .debug('get list')
    .mergeMap(() =>
      getData()
        .map(parse)
        .map(dispatchLoaded)
        .takeUntil(action$.ofType(FETCH_USER_CANCELLED))
        .catch(error =>
          Observable.of({
            type: FETCH_TOURNAMENTLIST_FAILED,
            payload: error,
            error: true
          })
        )
    )

export default fetchTournamentListEpic
