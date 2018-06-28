import { LOCATION_CHANGE } from 'react-router-redux';
import { ACTION_UPDATE_APP } from '../../constants/ActionTypes';

const initialState = {
  loading: false,
  error: false,
  errorMessage: ''
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_UPDATE_APP:
      return {
          ...state,
          ...action.payload
      };
    case LOCATION_CHANGE:
      return initialState;
    default:
      return state;
  }
}

export default app;
