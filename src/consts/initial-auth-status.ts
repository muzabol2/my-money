import {
  AuthProcessStatus,
  StatusState as S,
  StatusMessages as M,
} from "models";

export const INITIAL_AUTH_STATUS: AuthProcessStatus = {
  state: S.IDLE,
  message: M.EMPTY,
};
