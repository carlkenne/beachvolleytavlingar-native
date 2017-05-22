import filter from './filter';
import tournamentDetails from 'beachvolleytavlingar/app/containers/tournamentDetailsTabbar/reducers';
import tournamentList from 'beachvolleytavlingar/app/containers/tournamentList/reducers';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  filter,
  tournamentDetails,
  tournamentList
})

export default reducers
