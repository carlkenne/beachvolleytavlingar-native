import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs'
import * as consts from './constants'
import parse from './parseHtml'
import mockedData from './mocks/vis_innbydelse_php'
import { getTournamentDetailsUrl } from '../../utils/config'

const DEV_MODE = true

const dispatchLoaded = payload => ({
  type: consts.GET_TOURNAMENT_DETAILS_SUCCESS,
  ...payload,
})

const getData = id =>
  DEV_MODE
    ? Observable.of({ response: mockedData })
    : ajax({
        //console.log(getTournamentDetailsUrl(id), id) ||
        url: getTournamentDetailsUrl(id),
        responseType: 'text',
      })

const fetchTournamentListEpic = action$ =>
  action$
    .filter(action => action.type === consts.GET_TOURNAMENT_DETAILS)
    .debug('get details')
    .mergeMap(action =>
      getData(action.id)
        .map(parse)
        .map(dispatchLoaded)
        .catch(error =>
          Observable.of({
            type: consts.GET_TOURNAMENT_DETAILS_FAILED,
            payload: error,
            error: true,
          }),
        ),
    )

export default fetchTournamentListEpic
