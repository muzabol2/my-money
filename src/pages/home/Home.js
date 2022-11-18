import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import TransactionForm from './TransactionForm';
import TransactionGrid from './TransactionGrid';
import Title from '../../components/Title';
import { Grid, Container, TextField } from '@mui/material';
import { useState } from 'react';
import './Home.css';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function Home() {
   const { user } = useAuthContext();
   const { documents, error } = useCollection(
      'transactions',
      ["uid", "==", user.uid],
      ["createdAt", "desc"]
   );

   const [value, setValue] = useState(dayjs('2022-11-01'));

   return (
      <Container style={{ margin: '10px auto' }}>
         <Grid
            container
            direction="column"
            justifyContent="center"
         >
            <Title>Transactions</Title>
            <Grid item>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                     openTo="month"
                     views={['year', 'month']}
                     label="Pick a month"
                     value={dayjs(value)}
                     onChange={newValue => setValue(newValue)}
                     renderInput={params => <TextField {...params} helperText={null} />}
                  />
               </LocalizationProvider>
            </Grid>
            <Grid
               item
               container
               direction="row-reverse"
               justifyContent="flex-end"
               alignItems="flex-start"
            >
               <Grid item md={3}>
                  <TransactionForm uid={user.uid} />
               </Grid>
               <Grid item md={9}>
                  {error && <p>{error}</p>}
                  {!!documents &&
                     <TransactionGrid
                        transactions={documents}
                        filterMonthYear={value.format('MM/YYYY').toString()}
                     />
                  }
               </Grid>
            </Grid>
         </Grid>
      </Container>
   );
}
