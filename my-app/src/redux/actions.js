import { ADD_NOTE, DELETE_NOTE, REMOVE_FROM_BASKET, RESTORE_NOTE, SET_COLOR } from "./actionTypes";

let nextTodoId = 0;

export const addNote= note => ({
  type: ADD_NOTE,
  payload: {
    note
  }
});

export const deleteNote= note => ({
  type: DELETE_NOTE,
  payload: {
    note
  }
});

export const removeFromBasket= noteId => ({
  type: REMOVE_FROM_BASKET,
  payload: {
    noteId
  }
});

export const restoreNote= note => ({
  type: RESTORE_NOTE,
  payload: {
    note
  }
});

export const setColor= (noteId, color) => ({
  type: SET_COLOR,
  payload: {
    noteId, color
  }
});

