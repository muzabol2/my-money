import { AuthProcessStatus, StatusMessages as M, StatusState as S } from "models";

export const INITIAL_AUTH_STATUS: AuthProcessStatus = {
  state: S.IDLE,
  message: M.EMPTY,
};
