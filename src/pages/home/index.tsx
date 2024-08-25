import {
  COLLECTION_TRANSACTIONS,
  FIELD_CREATED_AT,
  FIELD_UID,
  QUERY_OPERATOR_DESC,
  QUERY_OPERATOR_EQUAL,
} from "consts";
import { useAuthContext } from "context";
import { useCollection } from "hooks";
import { Transaction } from "models";
import { BodySection } from "./body-section";
import { StyledContainer, StyledErrorMsg } from "./styled";

const Home = () => {
  const { user } = useAuthContext();
  const { documents, error } = useCollection<Transaction>(
    COLLECTION_TRANSACTIONS,
    [FIELD_UID, QUERY_OPERATOR_EQUAL, user?.uid || ""],
    [FIELD_CREATED_AT, QUERY_OPERATOR_DESC]
  );

  return (
    <StyledContainer>
      {error && <StyledErrorMsg>{error}</StyledErrorMsg>}
      {!!documents && <BodySection transactions={documents} />}
    </StyledContainer>
  );
};

export { Home };
