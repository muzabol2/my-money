import { User } from "firebase/auth";
import { AuthType, StatusState } from "../enums";

export type AuthUser = User;

export interface AuthProcessStatus {
  state: StatusState;
  message: string;
}

export type AuthAction =
  | { type: AuthType.LOGIN; payload: AuthUser }
  | { type: AuthType.LOGOUT }
  | { type: AuthType.AUTH_IS_READY; payload: AuthUser | null };

export type AuthContextType = {
  user: AuthUser | null;
  authIsReady: boolean;
  dispatch: React.Dispatch<AuthAction>;
};

export interface AuthState {
  user: AuthUser | null;
  authIsReady: boolean;
}
