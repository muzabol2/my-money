import { User } from "firebase/auth";

import { AuthType as T, StatusState } from "models";

export type AuthUser = User;

export interface AuthProcessStatus {
  state: StatusState;
  message: string;
}

export type AuthAction =
  | { type: T.LOGIN; payload: AuthUser }
  | { type: T.LOGOUT }
  | { type: T.AUTH_IS_READY; payload: AuthUser | null };

export type AuthContextType = {
  user: AuthUser | null;
  authIsReady: boolean;
  dispatch: React.Dispatch<AuthAction>;
};

export interface AuthState {
  user: AuthUser | null;
  authIsReady: boolean;
}
