import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import * as consts from './constants'


const FETCH_USER_CANCELLED = 'FETCH_USER_CANCELLED'

const sectionHeaders = {
  tp1: 'TP 1 (1 jan - 4 april)',
};

const tournamentData = {
  tp1: [
    {
      name: 'Trettondagsturneringen - Challenger',
      type: 'challenger',
      date: 'fre, 7 jan',
      club: 'Göteborg BC',
    },
    {
      name: 'Trettondagsturneringen - Open grön',
      type: 'opengrön',
      date: 'lör, 8 jan',
      club: 'Göteborg BC',
    },
    {
      name: 'Trettondagsturneringen - Open svart',
      type: 'opensvart',
      date: 'sön, 9 jan',
      club: 'Göteborg BC',
    },
    {
      name: 'MBC Active Beach Challenger',
      type: 'challenger',
      date: 'lör, 15 jan',
      club: 'Malmö BC',
    },
    {
      name: '08 Beachvolley Open Svart',
      type: 'opensvart',
      date: 'lör, 17 feb',
      club: '08 Beachvolley Club',
    },
    {
      name: 'IKSU Beachvolley damchallenger, v8',
      type: 'opensvart',
      date: 'lör, 18 feb',
      club: 'IK Studenterna i Umeå',
    },
    {
      name: 'IKSU Beachvolley herrchallenger, v8',
      type: 'opensvart',
      date: 'sön, 19 feb',
      club: 'IK Studenterna i Umeå',
    },
  ],
}

const parseHTML = (response) => {
  return { sectionHeaders, tournamentData }
}

const dispatchLoaded = payload => ({ type: consts.GET_TOURNAMENTLIST_SUCCESS, ...payload });

const fetchTournamentListEpic = action$ =>
 action$.filter(action => action.type === consts.GET_TOURNAMENTLIST)
  .mergeMap(() =>
    ajax({
      url: 'https://www.profixio.com/fx/terminliste.php?org=SVBF.SE.SVB',
      responseType: 'text'
    })
      .map(parseHTML)
      .map(dispatchLoaded)
      .takeUntil(action$.ofType(FETCH_USER_CANCELLED))
      .catch(error => Observable.of({
            type: consts.GET_TOURNAMENTLIST_FAILED,
            payload: error.xhr.response,
            error: true
        }))
  )

export default fetchTournamentListEpic

//yield put({ type: consts.GET_TOURNAMENTLIST_FAILED, message: e.message })
