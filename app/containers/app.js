import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import Navigator from './navigator';
import sagas from './tournamentList/sagas';

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);
console.log(reducers)

// Extensions
sagaMiddleware.run(sagas);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
