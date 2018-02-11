import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs'
import parse from './parseHtml'
import mockedData from './mocks/terminliste_php'
import { getTournamentListUrl } from '../../utils/config'
import DEV_MODE from '../../utils/devmode'

const FETCH_USER_CANCELLED = 'FETCH_USER_CANCELLED'
export const GET_TOURNAMENTLIST_SUCCESS =
  'tournamentList/GET_TOURNAMENTLIST_SUCCESS'
export const GET_TOURNAMENTLIST_FAILED =
  'tournamentList/GET_TOURNAMENTLIST_FAILED'
export const GET_TOURNAMENTLIST = 'tournamentList/GET_TOURNAMENTLIST'

const dispatchLoaded = payload => ({
  type: GET_TOURNAMENTLIST_SUCCESS,
  ...payload,
})

const getData = () =>
  DEV_MODE
    ? Observable.of({ response: mockedData })
    : ajax({
        url: getTournamentListUrl(),
        responseType: 'text',
      })

const fetchTournamentListEpic = action$ =>
  action$
    .filter(action => action.type === GET_TOURNAMENTLIST)
    .debug('get list')
    .mergeMap(() =>
      getData()
        .map(parse)
        .map(dispatchLoaded)
        .takeUntil(action$.ofType(FETCH_USER_CANCELLED))
        .catch(error =>
          Observable.of({
            type: GET_TOURNAMENTLIST_FAILED,
            payload: error,
            error: true,
          }),
        ),
    )

export default fetchTournamentListEpic
