import { ADD_NOTE, DELETE_NOTE, REMOVE_FROM_BASKET, RESTORE_NOTE, SET_COLOR } from "../actionTypes";


const initialState = {
  notes: JSON.parse(localStorage.getItem("notes")),
  basket: JSON.parse(localStorage.getItem("basket"))
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTE: {
      const { note } = action.payload;
      console.log("note", note);
      console.log("state", state);
      return {
        ...state,
        notes: [...state.notes, note],
        // notes: [note],
      };
    }
    case SET_COLOR: {
      const { noteId, color } = action.payload;
      console.log(noteId);
      let newNote = state.notes.find(function (obj) {
        return obj.id == noteId
    });
      let newNotes = state.notes.filter(function (obj) {
        return obj.id != noteId
    });
    newNote.color = color;
      return {
        ...state,
        notes: [...newNotes, newNote],
        // notes: [note],
      };
    }
    case DELETE_NOTE: {
      const { note } = action.payload;
      console.log("deletedNote", note);
      console.log("state notes", state.notes);
      let newState = state.notes.filter(function (obj) {
        return obj.id != note.id
    });
      console.log("newState", newState);
      console.log("state",state);
      return {
        ...state,
        notes: [...newState],
        basket: [...state.basket, note],
        // basket: [note],
      };
    }
    case REMOVE_FROM_BASKET: {
      const { noteId } = action.payload;
      let newBasket = state.basket.filter(function (note) {
        return note.id != noteId
    });
      return {
        ...state,
        notes: [...state.notes],
        basket: [...newBasket],
      };
    }
    case RESTORE_NOTE: {
      const { note } = action.payload;
      let newBasket = state.basket.filter(function (obj) {
        return obj.id != note.id
    });
      return {
        ...state,
        notes: [...state.notes, note],
        basket: [...newBasket],
      };
    }
    // case DELETE_NOTE: {
    //   const { id } = action.payload;
    //   return {
    //     ...state,
    //     byIds: {
    //       ...state.byIds,
    //       [id]: {
    //         ...state.byIds[id],
    //         completed: !state.byIds[id].completed
    //       }
    //     }
    //   };
    // }
    default:
      return state;
  }
}
