import * as types from '../../constants/ActionTypes';

export function updateAppAction (payload) {
  return { type: types.ACTION_UPDATE_APP, payload };
}

export function handleErrorAction (payload) {
  return { type: types.ACTION_HANDLE_ERROR, payload };
}
