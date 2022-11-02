import { useFirestore } from '../../hooks/useFirestore';
import dayjs from 'dayjs';
import './Home.css';


export default function TransactionList({ transactions }) {
   const { deleteDocument } = useFirestore('transactions')

   const sum = transactions.reduce((accumulator, transaction) => {
      return accumulator + Number(transaction.amount);
   }, 0);

   const formatDate = (date) => dayjs(date).format('DD/MM/YYYY');

   return (
      <ul className="transactions">
         <h2>Sum: {sum.toFixed(2)} PLN</h2>
         {transactions?.map(transaction => (
            <li key={transaction.id}>
               <p className="transactionName">{transaction.transactionName}</p>
               <p className="transactionCategory">{transaction.transactionCategory}</p>
               <p className="transactionDate">{formatDate(transaction.transactionDate)}</p>
               <p className="amount">{transaction.amount}</p>
               <button onClick={() => deleteDocument(transaction.id)}>x</button>
            </li>
         ))}
      </ul>
   );
}

// TODO: transactionName optional ???
