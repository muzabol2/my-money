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
import { ColorButton } from '../../components/ColorButton';

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
               <Container
                  style={{
                     backgroundColor: '#effaf0',
                     borderRadius: '10px',
                     border: '2px solid',
                     borderColor: '#1f9751'
                  }}>
                  <Grid
                     container
                     direction="column"
                     justifyContent="center"
                     alignItems="center"
                  >
                     <Grid item mt={3} mb={1}>
                        <Field
                           label="Transaction name"
                           name="transactionName"
                           component={TextFormField}
                        />
                     </Grid>
                     <Grid item mb={1}>
                        <Field
                           label="Date"
                           name="transactionDate"
                           component={DatePickerField}
                        />
                     </Grid>
                     <Grid item mb={1}>
                        <Field
                           label="Category"
                           name="transactionCategory"
                           component={SelectFormField}
                           options={categories}
                        />
                     </Grid>
                     <Grid item mb={1}>
                        <Field
                           label="Amount (PLN)"
                           name="amount"
                           component={TextFormField}
                        />
                     </Grid>
                     <Grid item mb={3}>
                        <ColorButton
                           style={{ width: '220px', height: '50px' }}
                           type="submit"
                           disabled={isSubmitting}
                        >
                           Add Transaction
                        </ColorButton>
                     </Grid>
                  </Grid>
               </Container>
            </Form>
         </FormikProvider>
      </div >
   )
}
