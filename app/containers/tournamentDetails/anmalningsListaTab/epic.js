import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs'
import parse from './parseHtml'
import mockedData from './mocks/vis_innbydelse_php'
import { getAnmalningslistaUrl } from '../../../utils/config'
import DEV_MODE from '../../../utils/devmode'

export const GET_ANMALNINGSLISTA_SUCCESS = 'GET_ANMALNINGSLISTA_SUCCESS'
export const GET_ANMALNINGSLISTA_FAILED = 'GET_ANMALNINGSLISTA_FAILED'
export const GET_ANMALNINGSLISTA = 'GET_ANMALNINGSLISTA'

export const fetchAnmalningslista = tournamentDetails => ({
  type: GET_ANMALNINGSLISTA,
  tournamentDetails
})

const dispatchLoaded = payload => ({
  type: GET_ANMALNINGSLISTA_SUCCESS,
  payload
})

const getData = cookie =>
  DEV_MODE
    ? Observable.of({ response: mockedData })
    : ajax({
        url: getAnmalningslistaUrl(),
        responseType: 'text',
        headers: {
          Cookie: cookie.replace('path=/,', '').replace('path=/', '')
        }
      })

const setServerSideCookie = link =>
  DEV_MODE
    ? Observable.of({ xhr: { responseHeaders: { 'Set-Cookie': 'cookie' } } })
    : ajax({
        url: link,
        responseType: 'text'
      })

const fetchAnmalningsListaEpic = action$ =>
  action$
    .filter(action => action.type === GET_ANMALNINGSLISTA)
    .debug('get anmalningslista')
    .mergeMap(action =>
      setServerSideCookie(action.tournamentDetails.registrationLink)
        .debug('response')
        .mergeMap(resp =>
          getData(resp.xhr.responseHeaders['Set-Cookie']).map(parse)
        )
    )
    .map(dispatchLoaded)
    .catch(error => {
      console.log('error: ', error)
      return Observable.of({
        type: GET_ANMALNINGSLISTA_FAILED,
        payload: error,
        error: true
      })
    })

export default fetchAnmalningsListaEpic
