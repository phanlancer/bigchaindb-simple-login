import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './services/store';

import App from './App';
import Page404 from './scenes/404';

const history = createHistory();

export const { store, persistor } = configureStore(undefined, history);

const MOUNT_NODE = document.getElementById('root');

render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<div>Loading</div>}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={App} />
            <Route component={Page404} />
          </Switch>
        </ConnectedRouter>
    </PersistGate>
  </Provider>,
  MOUNT_NODE
);

registerServiceWorker();