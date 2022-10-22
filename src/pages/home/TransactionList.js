import { useFirestore } from '../../hooks/useFirestore';
import './Home.css';

export default function TransactionList({ transactions }) {
   const { deleteDocument } = useFirestore('transactions')
   console.log("transactions", transactions);

   const sum = transactions.reduce((accumulator, transaction) => {
      return accumulator + Number(transaction.amount);
    }, 0);

   return (
      <ul className="transactions">
         <h2>Sum: {sum.toFixed(2)} PLN</h2>
         {transactions.map(transaction => (
            <li key={transaction.id}>
               <p className="transactionName">{transaction.transactionName}</p>
               <p className="amount">{transaction.amount}</p>
               <button onClick={() => deleteDocument(transaction.id)}>x</button>
            </li>
         ))}
      </ul>
   );
}
