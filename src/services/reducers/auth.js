import { ACTION_UPDATE_AUTH } from '../../constants/ActionTypes';

const initialState = {
  token: '',
  authenticated: false,
  me: {}
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_UPDATE_AUTH:
      const newState = {
        ...state,
        ...action.payload
      };

      return newState;
    default:
      return state;
  }
};

export default auth;
