import { AuthProcessStatus, StatusMessages as M, StatusState as S } from "models";

const INITIAL_AUTH_STATUS: AuthProcessStatus = {
  state: S.IDLE,
  message: M.EMPTY,
};

export { INITIAL_AUTH_STATUS };
