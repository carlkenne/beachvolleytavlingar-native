import React from 'react'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { ThemeProvider } from 'styled-components/native'
import { createEpicMiddleware } from 'redux-observable';
import reducers from './reducers'
import { rootEpics  } from './epics'
import MainNaviagtionTabBar from './mainNavigationTabbar'
import theme from './theme'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware  = createEpicMiddleware(rootEpics)
const store = createStore(reducers, composeEnhancers(applyMiddleware(epicMiddleware)))

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <MainNaviagtionTabBar />
      </Provider>
    </ThemeProvider>
  )
}
