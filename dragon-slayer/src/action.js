export const START_GAME = 'START_GAME';

/*
 * action creators
 */
export function startGame(player) {
  return { type: START_GAME, payload: player };
}
