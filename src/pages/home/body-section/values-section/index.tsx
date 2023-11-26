import { useFirestore } from "hooks";

import { Transaction } from "models";

import TransactionItem from "./transaction-item";

interface Props {
  transactions: Transaction[];
}

const ValuesSection = ({ transactions }: Props) => {
  const { deleteDocument } = useFirestore("transactions");

  return (
    <>
      {transactions?.map((transaction: Transaction) => (
        <TransactionItem
          key={transaction.id}
          t={transaction}
          deleteDocument={deleteDocument}
        />
      ))}
    </>
  );
};

export default ValuesSection;