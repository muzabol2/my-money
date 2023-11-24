import { useAuthContext, useCollection } from "hooks";

import { TransactionGrid } from "components";

import { StyledContainer } from "./styled";

const Home = () => {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  return (
    <StyledContainer>
      {error && <p>{error}</p>}
      {!!documents && <TransactionGrid transactions={documents} />}
    </StyledContainer>
  );
};

export default Home;
