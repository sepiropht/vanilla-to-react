import {
  START_GAME,
  PSEUDO_CHANGE,
  RADIO_CHANGE,
  INCREASE,
  DECREASE,
} from './action';

function player(
  state = {
    pseudo: 'link',
    agility: 10,
    strength: 10,
    difficulty: 'normal',
    points: 3,
  },
  action,
) {
  switch (action.type) {
    case START_GAME:
      return state;
    case PSEUDO_CHANGE:
      return Object.assign({}, state, { pseudo: action.payload });
    case RADIO_CHANGE:
      return Object.assign({}, state, { difficulty: action.payload });
    case INCREASE:
      if (state.points === 0) return state;
      return Object.assign({}, state, {
        [action.payload]: state[action.payload] + 1,
        points: state.points - 1,
      });
    case DECREASE:
      return Object.assign({}, state, {
        [action.payload]: state[action.payload] >= 1
          ? state[action.payload] - 1
          : state[action.payload],
        points: state.points + 1,
      });
    default:
      return state;
  }
}

export default player;
