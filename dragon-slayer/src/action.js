export const START_GAME = 'START_GAME';
export const PSEUDO_CHANGE = 'PSEUDO_CHANGE';
export const INCREASE = 'INCREASE';
export const DECREASE = 'DECREASE';
export const RADIO_CHANGE = 'RADIO_CHANGE';
/*
 * action creators
 */
export function increase(type) {
  return { type: INCREASE, payload: type };
}
export function radioChange(type) {
  return { type: RADIO_CHANGE, payload: type };
}
export function decrease(type) {
  return { type: DECREASE, payload: type };
}

export function startGame(player) {
  return { type: START_GAME, payload: player };
}

export function pseudoChange(text) {
  return { type: PSEUDO_CHANGE, payload: text };
}
