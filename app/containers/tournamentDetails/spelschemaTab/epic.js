import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs'
import parseHtml, { parseKlassLinks } from './parseHtml'

import mockedData from './mocks/gbc_open_svart_180210_k_kl_1073733-d-damer'
import DEV_MODE from '../../../utils/devmode'

export const FETCH_SPELSCHEMA_SUCCESS = 'FETCH_SPELSCHEMA_SUCCESS'
export const FETCH_SPELSCHEMA_FAILED = 'FETCH_SPELSCHEMA_FAILED'
export const FETCH_SPELSCHEMA = 'FETCH_SPELSCHEMA'

export const fetchSpelschema = tournamentDetails => ({
  type: FETCH_SPELSCHEMA,
  tournamentDetails
})

const dispatchLoaded = payload => ({
  type: FETCH_SPELSCHEMA_SUCCESS,
  payload
})

const getData = url => {
  console.log('getData: ', url)
  return DEV_MODE
    ? Observable.of({ response: mockedData })
    : ajax({
        url,
        responseType: 'text'
      })
}

const fetchSpelschemaEpic = action$ =>
  action$
    .filter(action => action.type === FETCH_SPELSCHEMA)
    .debug('get spelschema')
    .mergeMap(action =>
      getData(action.tournamentDetails.resultatLink + '/k')
        .map(parseKlassLinks)
        .debug('klasslinks')
        .mergeMap(links =>
          Observable.forkJoin(
            getData('https://www.profixio.com' + links.herrarLink),
            getData('https://www.profixio.com' + links.damerLink)
          )
            .debug('result')
            .map(parseHtml(links))
            .map(dispatchLoaded)
        )
        .catch(error => {
          console.log('error: ', error)
          return Observable.of({
            type: FETCH_SPELSCHEMA_FAILED,
            payload: error,
            error: true
          })
        })
    )

export default fetchSpelschemaEpic
