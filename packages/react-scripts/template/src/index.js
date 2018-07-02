import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import styled from 'styled-components';
import { Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

import reducer from './reducer';
import saga from './saga';

import Home from './Home';

const PageContainer = styled.div`
`;

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createBrowserHistory();

// mount it on the Store
const store = createStore(
  connectRouter(history)(reducer),
  {},
  composeEnhancers(
    applyMiddleware(
      createSagaMiddleware(),
      routerMiddleware(history),
    ),
  ),
);

// then run the saga
sagaMiddleware.run(saga);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PageContainer>
        <Sidebar />

        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </PageContainer>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
