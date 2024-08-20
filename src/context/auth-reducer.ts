import { AuthAction, AuthState, AuthType as T } from "models";

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case T.LOGIN:
      return { ...state, user: action.payload };
    case T.LOGOUT:
      return { ...state, user: null };
    case T.AUTH_IS_READY:
      return { ...state, user: action.payload, authIsReady: true };

    default:
      return state;
  }
};

export { authReducer };
