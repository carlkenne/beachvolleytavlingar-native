import 'rxjs'
import { combineReducers } from 'redux'
import filter from '../containers/tournamentListFilter/reducers'
import tournamentList from '../containers/tournamentList/reducers'
import mainNavigation from '../containers/mainNavigationTabbar/reducers'
import tournamentDetails from '../containers/tournamentDetails/reducers'
import anmalningslista from './tournamentDetails/anmalningsListaTab/reducers'
import spelschema from './tournamentDetails/spelschemaTab/reducers'

const reducers = combineReducers({
  filter,
  tournamentList,
  tournamentDetails,
  mainNavigation,
  anmalningslista,
  spelschema
})

export default reducers
