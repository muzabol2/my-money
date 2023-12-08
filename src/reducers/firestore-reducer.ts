import { DocumentData } from "firebase/firestore";

import { getToastMsg } from "utils/toast-msg";

import {
  FirestoreType as T,
  FirebaseStatus as S,
  FirestoreMessages,
} from "models";

interface State {
  status: S;
  document: DocumentData | null;
  errorMsg: string | null;
}

interface Action {
  type: T;
  payload?: DocumentData;
}

export const INITIAL_STATE: State = {
  document: null,
  status: S.IDLE,
  errorMsg: null,
};

export const firestoreReducer = (state: State, action: Action) => {
  switch (action.type) {
    case T.IS_PENDING:
      return { ...state, status: S.PENDING };
    case T.ADDED_USER:
    case T.ADDED_DOC:
    case T.DELETED_DOC:
    case T.ADDED_CATEGORY:
    case T.DELETED_CATEGORY:
      getToastMsg(FirestoreMessages[action.type]);

      return { ...state, status: S.SUCCESS, document: action.payload };
    case T.ERROR:
      getToastMsg(action.payload?.message);

      return { ...state, status: S.ERROR, errorMsg: action.payload };

    default:
      return state;
  }
};
