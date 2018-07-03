import * as types from '../../constants/ActionTypes';

export function loginAction (credential) {
  return { type: types.ACTION_LOGIN, payload: credential };
}

export function logoutAction (redirect) {
  return { type: types.ACTION_LOGOUT, payload: redirect };
}

export function registerAction (payload) {
  return { type: types.ACTION_REGISTER, payload };
}

export function updateProfileAction (payload) {
  return { type: types.ACTION_UPDATE_PROFILE, payload };
}

export function updateAuthAction (payload) {
  return { type: types.ACTION_UPDATE_AUTH, payload };
}
