import { useFirestore } from "utils";

import { Transaction } from "models";
import { COLLECTION_TRANSACTIONS } from "consts";

import TransactionItem from "./transaction-item";

interface Props {
  transactions: Transaction[];
}

const ValuesSection = ({ transactions }: Props) => {
  const { deleteDocument } = useFirestore(COLLECTION_TRANSACTIONS);

  return (
    <>
      {transactions?.map((transaction: Transaction) => (
        <TransactionItem key={transaction.id} t={transaction} deleteDocument={deleteDocument} />
      ))}
    </>
  );
};

export default ValuesSection;
