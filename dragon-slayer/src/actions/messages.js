export const ADD_MESSAGE = 'ADD_MESSAGE';
export const UPDATE_STATUS = 'UPDATE_STATUS;';
/*
 * action creators
 */
export function addMessage(type) {
  return { type: ADD_MESSAGE, payload: type };
}

export function updateStatus(type) {
  return { type: UPDATE_STATUS, payload: type };
}
