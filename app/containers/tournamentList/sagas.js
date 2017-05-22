import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as consts from './constants';

function* getTournamentList(action) {
  console.log('saga started');
  try {
     //const data = yield call("url", "payload");
     const sectionHeaders = {
       tp1: "TP 1 (1 jan - 4 april)"
     }
     const tournamentData = {
       tp1:[
         {name:'Trettondagsturneringen - Challenger', type: 'challenger', date: 'fre, 7 jan', club: 'Göteborg BC'},
         {name:'Trettondagsturneringen - Open grön', type: 'opengrön', date: 'lör, 8 jan', club: 'Göteborg BC'},
         {name:'Trettondagsturneringen - Open svart', type: 'opensvart', date: 'sön, 9 jan', club: 'Göteborg BC'},
         {name:'MBC Active Beach Challenger', type: 'challenger', date: 'lör, 15 jan', club: 'Malmö BC'},
         {name:'08 Beachvolley Open Svart', type: 'opensvart', date: 'lör, 17 feb', club: '08 Beachvolley Club'},
         {name:'IKSU Beachvolley damchallenger, v8', type: 'opensvart', date: 'lör, 18 feb', club: 'IK Studenterna i Umeå'},
         {name:'IKSU Beachvolley herrchallenger, v8', type: 'opensvart', date: 'sön, 19 feb', club: 'IK Studenterna i Umeå'},

       ]
     };
     yield put({type: consts.GET_TOURNAMENTLIST_SUCCESS, sectionHeaders, tournamentData });
  } catch (e) {
     yield put({type: consts.GET_TOURNAMENTLIST_FAILED, message: e.message});
  }
}

function* getTournamentListSaga() {
  console.log("saga listening");
  yield takeLatest(consts.GET_TOURNAMENTLIST, getTournamentList)
}

export default getTournamentListSaga;
