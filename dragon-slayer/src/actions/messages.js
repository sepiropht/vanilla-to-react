export const ADD_MESSAGE = 'ADD_MESSAGE';

/*
 * action creators
 */
export function addMessage(type) {
  return { type: ADD_MESSAGE, payload: type };
}
