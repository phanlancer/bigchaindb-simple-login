import { all, takeEvery } from 'redux-saga/effects';

import * as types from '../../constants/ActionTypes';

// import { fetchLogin, fetchRegister, fetchLogout } from '../sagas/auth';


import { handleFetchError } from './error';

export default function * root () {
  yield all([
    // Authentication
    // takeEvery(types.ACTION_LOGIN, fetchLogin),
    // takeEvery(types.ACTION_LOGOUT, fetchLogout),
    // takeEvery(types.ACTION_REGISTER, fetchRegister),
    // Profile
    // takeEvery(types.ACTION_GET_PROFILE, fetchGetProfile),
    // takeEvery(types.ACTION_MODIFY_PROFILE, fetchModifyProfile),
    // takeEvery(types.ACTION_DELETE_PROFILE, fetchDeleteProfile),
    // takeEvery(types.ACTION_CREATE_PROFILE, fetchCreateProfile),
    // Error
    takeEvery(types.ACTION_HANDLE_ERROR, handleFetchError)
  ]);
}
