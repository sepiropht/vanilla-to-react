import { UPDATE_STATUS } from '../actions/messages';

function status(state = {}, action) {
  switch (action.type) {
    case UPDATE_STATUS:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
}

export default status;
