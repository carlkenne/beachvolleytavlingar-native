import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs'
import parseHtml from './parseHtml'
import mockedData from './mocks/terminliste_php'
import { getTournamentListUrl } from '../../utils/config'
import DEV_MODE from '../../utils/devmode'

export const FETCH_TOURNAMENTLIST_SUCCESS =
  'tournamentList/FETCH_TOURNAMENTLIST_SUCCESS'
export const FETCH_TOURNAMENTLIST_FAILED =
  'tournamentList/FETCH_TOURNAMENTLIST_FAILED'
export const FETCH_TOURNAMENTLIST = 'tournamentList/FETCH_TOURNAMENTLIST'

const dispatchLoaded = payload => ({
  type: FETCH_TOURNAMENTLIST_SUCCESS,
  ...payload
})

const getData = () => {
  console.warn('getData')
  console.log('do not remove')
  // throw new Error('could not connect')

  return DEV_MODE
    ? Observable.of({ response: mockedData })
    : ajax({
        url: getTournamentListUrl(),
        responseType: 'text'
      })
}

const fetchTournamentListEpic = action$ =>
  action$
    .ofType(FETCH_TOURNAMENTLIST)
    .debug('get list')
    .mergeMap(() =>
      getData()
        .map(parseHtml)
        .map(dispatchLoaded)
        .catch(error => {
          console.warn('error in epic: ', error)
          return Observable.of({
            type: FETCH_TOURNAMENTLIST_FAILED,
            payload: error,
            error: true
          })
        })
    )

export default fetchTournamentListEpic
