import { useEffect, useState } from "react";

import { useAuthContext } from "context";

import { TransactionForm } from "components";
import { PlusIcon } from "icons";

import { StyledContainer, StyledMenuButton } from "./styled";

const TransactionPlus = () => {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  //cleanup function
  useEffect(() => () => setIsOpen(true), []);

  return (
    <StyledContainer>
      <StyledMenuButton onClick={() => setIsOpen(!isOpen)}>
        <PlusIcon />
      </StyledMenuButton>
      {isOpen && <TransactionForm uid={user?.uid ?? ""} />}
    </StyledContainer>
  );
};

export default TransactionPlus;
