import { useFirestore } from '../../hooks/useFirestore';
import { useFormik, FormikProvider, Form } from 'formik';
import { transactionSchema } from './validateTransaction';
import './Home.css';

export default function TransactionForm({ uid }) {
   const { addDocument } = useFirestore('transactions');

   const toNumber = (amount) => Number(amount.replace(/,/, '.'));

   const transactionFormik = useFormik({
      initialValues: {
         transactionName: "",
         amount: "",
      },
      validationSchema: transactionSchema,
      onSubmit: ({ transactionName, amount }) => addDocument({ uid, transactionName, amount: toNumber(amount) })
   });

   const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = transactionFormik;

   return (
      <div>
         <FormikProvider value={transactionFormik}>
            <Form onSubmit={handleSubmit}>
               <label>
                  <span>Transaction name:</span>
                  <input
                     value={values.transactionName}
                     onChange={handleChange}
                     id="transactionName"
                     type="text"
                     onBlur={handleBlur}
                     className={errors.transactionName && touched.transactionName ? "input-error" : ""}
                  />
                  {errors.transactionName && touched.transactionName && <p>{errors.transactionName}</p>}
               </label>
               <label>
                  <span>Amount (PLN):</span>
                  <input
                     id="amount"
                     type="text"
                     value={values.amount}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     className={errors.amount && touched.amount ? "input-error" : ""}
                  />
                  {errors.amount && touched.amount && (<p>{errors.amount}</p>)}
               </label>
               <button type="submit" disabled={isSubmitting} className="transactions">Add Transaction</button>
            </Form>
         </FormikProvider>
      </div>
   )
}
