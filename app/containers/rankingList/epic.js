import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs'
import parse from './parseHtml'
import { getTournamentListUrl } from '../../utils/config'
import DEV_MODE from '../../utils/devmode'

const FETCH_USER_CANCELLED = 'FETCH_USER_CANCELLED'
export const FETCH_RANKINGLIST_SUCCESS =
  'tournamentList/FETCH_RANKINGLIST_SUCCESS'
export const FETCH_RANKINGLIST_FAILED =
  'tournamentList/FETCH_RANKINGLIST_FAILED'
export const FETCH_RANKINGLIST = 'tournamentList/FETCH_RANKINGLIST'

const dispatchLoaded = payload => ({
  type: FETCH_RANKINGLIST_SUCCESS,
  ...payload
})

const getData = () =>
  DEV_MODE
    ? Observable.of({ response: '' })
    : ajax({
        url: getTournamentListUrl(),
        responseType: 'text'
      })

const fetchRankingListEpic = action$ =>
  action$
    .filter(action => action.type === FETCH_RANKINGLIST)
    .debug('get ranking list')
    .mergeMap(() =>
      getData()
        .map(parse)
        .map(dispatchLoaded)
        .takeUntil(action$.ofType(FETCH_USER_CANCELLED))
        .catch(error => {
          console.warn('error in epic: ', error)
          Observable.of({
            type: FETCH_RANKINGLIST_FAILED,
            payload: error,
            error: true
          })
        })
    )

export default fetchRankingListEpic
