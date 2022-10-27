import { useFirestore } from '../../hooks/useFirestore';
import { useFormik, FormikProvider, Form, Field } from 'formik';
import { transactionSchema } from './validateTransaction';
import { TextFormField } from '../../formFields/TextFormField';
import { Grid } from '@mui/material';
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

   const { isSubmitting, handleSubmit } = transactionFormik;

   return (
      <div>
         <FormikProvider value={transactionFormik}>
            <Form onSubmit={handleSubmit}>

               <Grid>
                  <Field
                     label="Transaction name"
                     name="transactionName"
                     component={TextFormField}
                  />
               </Grid>

               <Grid>
                  <Field
                     label="Amount (PLN)"
                     name="amount"
                     component={TextFormField}
                  />
               </Grid>

               <button
                  type="submit"
                  disabled={isSubmitting}
                  className="transactions"
               >
                  Add Transaction
               </button>

            </Form>
         </FormikProvider>
      </div>
   )
}
