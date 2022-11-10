import { useFirestore } from '../../hooks/useFirestore';
import { useFormik, FormikProvider, Form, Field } from 'formik';
import { transactionSchema } from './validateTransaction';
import { TextFormField } from '../../formFields/TextFormField';
import { DatePickerField } from '../../formFields/DatePickerField';
import { SelectFormField } from '../../formFields/SelectFormField';
import dayjs from 'dayjs';
import { Button, Grid, Container } from '@mui/material';
import './Home.css';
import { useCollection } from '../../hooks/useCollection';

export default function TransactionForm({ uid }) {
   const { addDocument } = useFirestore('transactions');
   const { documents } = useCollection('users', ['uid', '==', uid]);
   
   const toNumber = (amount) => Number(amount.replace(/,/, '.'));
   const formatDate = (date) => dayjs(date).format('DD/MM/YYYY').toString();

   const categories = documents?.[0]?.categories;

   const transactionFormik = useFormik({
      initialValues: {
         transactionName: "",
         transactionDate: dayjs().toString(),
         transactionCategory: "",
         amount: "",
      },
      validationSchema: transactionSchema,
      onSubmit: ({ transactionName, transactionDate, transactionCategory, amount }) => {
         addDocument({
            uid,
            transactionName,
            transactionDate: formatDate(transactionDate),
            transactionCategory,
            amount: toNumber(amount)
         });
         resetForm();
      }
   });

   const { isSubmitting, handleSubmit, resetForm } = transactionFormik;

   return (
      <div>
         <FormikProvider value={transactionFormik}>
            <Form onSubmit={handleSubmit}>
               <Container>
                  <Grid
                     container
                     direction="column"
                     justifyContent="center"
                     alignItems="center"
                     spacing={1}
                     style={{
                        backgroundColor: '#effaf0',
                        borderRadius: '10px',
                        border: '2px solid',
                        borderColor: '#1f9751',
                        width: 260,
                     }}
                  >
                     <Grid item mt={1}>
                        <Field
                           label="Transaction name"
                           name="transactionName"
                           component={TextFormField}
                        />
                     </Grid>
                     <Grid item>
                        <Field
                           label="Date"
                           name="transactionDate"
                           component={DatePickerField}
                        />
                     </Grid>
                     <Grid item>
                        <Field
                           label="Category"
                           name="transactionCategory"
                           component={SelectFormField}
                           options={categories}
                        />
                     </Grid>
                     <Grid item>
                        <Field
                           label="Amount (PLN)"
                           name="amount"
                           component={TextFormField}
                        />
                     </Grid>
                     <Grid item mb={1}>
                        <Button
                           variant="contained"
                           style={{ backgroundColor: '#1f9751', height: 50, width: 225, maxWidth: 'md' }}
                           type="submit"
                           disabled={isSubmitting}
                        >
                           Add Transaction
                        </Button>
                     </Grid>
                  </Grid>
               </Container>
            </Form>
         </FormikProvider>
      </div >
   )
}
