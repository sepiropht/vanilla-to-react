import { START_GAME } from './action';

function player(state = {}, action) {
  switch (action.type) {
    case START_GAME:
      return Object.assign({}, player, {
        pseudo: action.payload.pseudo,
        agility: action.payload.agility,
        strength: action.payload.strength,
        difficulty: action.payload.difficulty,
      });
    default:
      return state;
  }
}

export default player;
