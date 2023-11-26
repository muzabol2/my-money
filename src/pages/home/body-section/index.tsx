import { Transaction } from "models";

import TitleSection from "./title-section";
import ValuesSection from "./values-section";

import { StyledContainer, StyledSumHeader, StyledItems } from "./styled";

interface Props {
  transactions: Transaction[];
}

const BodySection = ({ transactions }: Props) => {
  const transactionsSum = transactions
    .reduce((acc, { amount }) => acc + Number(amount), 0)
    .toFixed(2);

  return (
    <StyledContainer>
      <StyledSumHeader>{`Sum: ${transactionsSum} PLN`}</StyledSumHeader>
      <StyledItems>
        <TitleSection />
        <ValuesSection transactions={transactions} />
      </StyledItems>
    </StyledContainer>
  );
};

export default BodySection;
