import 'rxjs';
import { combineReducers } from 'redux';
import filter from '../containers/tournamentListFilter/reducers';
import tournamentList from '../containers/tournamentList/reducers';
import mainNavigation from '../containers/mainNavigationTabbar/reducers';
import tournamentDetails from '../containers/tournamentDetails/reducers';

const reducers = combineReducers({
  filter,
  tournamentList,
  tournamentDetails,
  mainNavigation,
});

export default reducers;
