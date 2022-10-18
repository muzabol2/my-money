import { useEffect, useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import './Home.css';

export default function TransactionForm({ uid }) {
   const [name, setName] = useState('');
   const [amount, setAmount] = useState('');
   const { addDocument, response } = useFirestore('transactions');

   const handleSubmit = (e) => {
      e.preventDefault();
      addDocument({ uid, name, amount });
   }

   useEffect(() => {
      if (response.success) {
         setName('');
         setAmount('');
      }
   }, [response.success]);

   return (
      <div >
         <form onSubmit={handleSubmit}>
            <label>
               <span>Transaction name:</span>
               <input
                  type="text"
                  maxLength={20}
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
               />
            </label>
            <label>
               <span>Amount (PLN):</span>
               <input
                  type="number"
                  placeholder="0.00"
                  min="0.01"
                  max="9999999"
                  step=".01"
                  required
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
               />
            </label>
            <button className="transactions">Add Transaction</button>
         </form>
      </div>
   )
}
