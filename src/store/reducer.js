import { FirestoreType as FT } from "models";

export let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case FT.IS_PENDING:
      return {
        document: null,
        isPending: true,
        error: null,
        success: null,
      };

    case FT.ADDED_DOCUMENT:
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };

    case FT.DELETED_DOCUMENT:
      return {
        document: null,
        isPending: false,
        error: null,
        success: true,
      };

    case FT.ERROR:
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};
