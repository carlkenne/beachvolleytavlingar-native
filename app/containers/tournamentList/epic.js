import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs'
import * as consts from './constants'
import parse from './parseHtml'
import mockedData from './mocks/terminliste_php'
import { getTournamentListUrl } from '../../utils/config'

const DEV_MODE = true
const FETCH_USER_CANCELLED = 'FETCH_USER_CANCELLED'

const dispatchLoaded = payload => ({
  type: consts.GET_TOURNAMENTLIST_SUCCESS,
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
    .filter(action => action.type === consts.GET_TOURNAMENTLIST)
    .debug('get list')
    .mergeMap(() =>
      getData()
        .map(parse)
        .map(dispatchLoaded)
        .takeUntil(action$.ofType(FETCH_USER_CANCELLED))
        .catch(error =>
          Observable.of({
            type: consts.GET_TOURNAMENTLIST_FAILED,
            payload: error,
            error: true,
          }),
        ),
    )

export default fetchTournamentListEpic
