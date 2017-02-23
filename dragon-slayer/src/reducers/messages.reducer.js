import { ADD_MESSAGE } from '../actions/messages';

function messages(state = [], action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.payload];

    default:
      return state;
  }
}

export default messages;
