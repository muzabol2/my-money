import { DocumentData } from "firebase/firestore";
import { FirebaseStatus as S, FirestoreType as T } from "models";

interface State {
  status: S;
  document?: DocumentData | null;
  errorMsg?: string | null;
}

interface Action {
  type: T;
  payload?: DocumentData;
}

const INITIAL_STATE: State = {
  document: null,
  status: S.IDLE,
  errorMsg: null,
};

const firestoreReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case T.IS_PENDING:
      return { ...state, status: S.PENDING };
    case T.ADDED_USER:
    case T.ADDED_DOC:
    case T.DELETED_DOC:
    case T.ADDED_CATEGORY:
    case T.DELETED_CATEGORY:
      return { ...state, status: S.SUCCESS, document: action.payload };
    case T.ERROR:
      return { ...state, status: S.ERROR, errorMsg: `${action.payload}` };

    default:
      return state;
  }
};

export type { State, Action };
export { INITIAL_STATE, firestoreReducer };
