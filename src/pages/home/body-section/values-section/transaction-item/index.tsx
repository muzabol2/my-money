import { Transaction } from "models";

import * as $ from "./styled";

interface Props {
  t: Transaction;
  deleteDocument(id: any): Promise<void>;
}

const TransactionItem = ({ t, deleteDocument }: Props) => (
  <$.TransactionItem>
    <$.StyledName>{t.transactionName}</$.StyledName>
    <$.StyledDate>{t.transactionDate}</$.StyledDate>
    <$.StyledCategory>{t.transactionCategory}</$.StyledCategory>
    <$.StyledAmount>{t.amount}</$.StyledAmount>
    <$.StyledDeleteButton onClick={() => deleteDocument(t.id)}>
      x
    </$.StyledDeleteButton>
  </$.TransactionItem>
);

export default TransactionItem;
