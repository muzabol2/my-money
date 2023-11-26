import { useAuthContext, useCollection } from "hooks";

import BodySection from "./body-section";

import { StyledContainer, StyledErrorMsg } from "./styled";

const Home = () => {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  return (
    <StyledContainer>
      {error && <StyledErrorMsg>{error}</StyledErrorMsg>}
      {!!documents && <BodySection transactions={documents} />}
    </StyledContainer>
  );
};

export default Home;
