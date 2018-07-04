import { ACTION_UPDATE_AUTH } from '../../constants/ActionTypes';

const initialState = {
  currentIdentity: {},
  authenticated: false,
  generatedPassword: '',
  me: {}                    // transaction in the blockchain
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
