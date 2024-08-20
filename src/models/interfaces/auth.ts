import { User } from "firebase/auth";
import { AuthType, StatusState } from "../enums";

type AuthUser = User;

interface AuthProcessStatus {
  state: StatusState;
  message: string;
}

type AuthAction =
  | { type: AuthType.LOGIN; payload: AuthUser }
  | { type: AuthType.LOGOUT }
  | { type: AuthType.AUTH_IS_READY; payload: AuthUser | null };

type AuthContextType = {
  user: AuthUser | null;
  authIsReady: boolean;
  dispatch: React.Dispatch<AuthAction>;
};

interface AuthState {
  user: AuthUser | null;
  authIsReady: boolean;
}

export type { AuthUser, AuthProcessStatus, AuthAction, AuthContextType, AuthState };
