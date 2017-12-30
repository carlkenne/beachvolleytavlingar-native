import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs';
import parse from './parseHtml';
import mockedData from './mocks/vis_innbydelse_php';
import { getAnmalningslistaUrl } from '../../../utils/config';
import DEV_MODE from '../../../utils/devmode';

export const GET_ANMALNINGSLISTA_SUCCESS = 'GET_ANMALNINGSLISTA_SUCCESS';
export const GET_ANMALNINGSLISTA_FAILED = 'GET_ANMALNINGSLISTA_FAILED';
export const GET_ANMALNINGSLISTA = 'GET_ANMALNINGSLISTA';

export const fetchAnmalningslista = id => ({
  type: GET_ANMALNINGSLISTA,
  id,
});

const dispatchLoaded = payload => ({
  type: GET_ANMALNINGSLISTA_SUCCESS,
  payload,
});

const getData = id =>
  (DEV_MODE
    ? Observable.of({ response: mockedData })
    : ajax({
      url: getAnmalningslistaUrl(id),
      responseType: 'text',
    }));

const fetchTournamentListEpic = action$ =>
  action$
    .filter(action => action.type === GET_ANMALNINGSLISTA)
    .debug('get anmalningslista')
    .mergeMap(action =>
      getData(action.id)
        .map(parse)
        .map(dispatchLoaded)
        .catch(error =>
          Observable.of({
            type: GET_ANMALNINGSLISTA_FAILED,
            payload: error,
            error: true,
          })));

export default fetchTournamentListEpic;
