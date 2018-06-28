import { createStore, compose, applyMiddleware } from 'redux';
import saga from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistState } from 'redux-devtools';

import reducers from '../reducers';
import sagas from '../sagas';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth']
}

const sagaMiddleware = saga();

function configureStore (initialState, history) {
  const middlewares = [routerMiddleware(history), sagaMiddleware];
  let enhancers;

  if (process.env.NODE_ENV === 'production') {
    enhancers = compose(applyMiddleware(...middlewares));
  } else {
    enhancers = compose(
      applyMiddleware(...middlewares),
      persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/))
      );
  }

  const pReducer = persistReducer(persistConfig, reducers);

  const store = createStore(pReducer, enhancers);
  const persistor = persistStore(store);

  sagaMiddleware.run(sagas);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // We need to require for hot reloading to work properly.
      const nextReducer = require('../reducers'); // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return { store, persistor }
}

export default configureStore;
