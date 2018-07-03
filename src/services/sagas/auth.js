import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { updateAppAction } from '../actions/app';
import { updateAuthAction } from '../actions/auth';
import { login, register } from '../apis/auth';

export function * fetchLogin (action) {
  console.log('--login---', action);
  try {
    yield put(updateAppAction({ loading: true, error: false, errorMessage: '' }));
    const redirect = action.payload.redirect;
    const payload = {
      password: action.payload.password
    };
    const res = yield call(login, payload);
    console.log('-res-', res);
    if (res.errors !== undefined) {
      console.log('-fail-');
      yield put(updateAppAction({ loading: false, error: true, errorMessage: res.errors }));
    } else {
      console.log('-success-')
      yield put(updateAppAction({ loading: false, error: false, errorMessage: '' }));
      yield put(updateAuthAction({ authenticated: true, ...res }));
      if (redirect !== '') {
        yield put(push(redirect));
      }
      yield put(push('/'));
    }
  } catch (error) {
    yield put(updateAppAction({ loading: false, error: true, errorMessage: 'Invalid password' }));
    console.log('-login error-', error);
  }
}

export function * fetchRegister (action) {
  try {
    yield put(updateAppAction({ loading: true, error: false, errorMessage: '' }));

    const res = yield call(register, action.payload);
    console.log('-res-', res);
    if (res.message !== undefined) {
      console.log('-fail-');
      yield put(updateAppAction({ loading: false, error: true, errorMessage: res.message }));
    } else {
      console.log('-success-');
      yield put(updateAppAction({ loading: false, error: false, errorMessage: '' }));
      yield put(updateAuthAction({ authenticated: true, ...res }));
      yield put(push('/'));
    }
  } catch (error) {

    yield put(updateAppAction({ loading: false, error: true, errorMessage: 'Something goes wrong' }));
    console.log('-register error-', error);
  }
}

export function * fetchLogout (action) {
  try {
    const redirect = action.payload;
    if (redirect === true) {
      const location = yield select(state => state.route.location);
      const pathname = location.pathname;

      const url = '/login?redirect=' + encodeURIComponent(pathname);

      yield put(updateAuthAction({ currentIdentity: undefined, authenticated: false, me: {} }));
      yield put(push(url));
    } else {
      yield put(updateAuthAction({ currentIdentity: undefined, authenticated: false, me: {} }));
      yield put(push('/'));
    }
  } catch (error) {}
}
