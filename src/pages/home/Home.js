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
      <Container style={{ margin: '30px auto' }}>
         <Title>Transactions</Title>
         <Grid item mb={1}>
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
            container
            direction="row-reverse"
            justifyContent="center"
         >
            <TransactionForm uid={user.uid} />
            <Grid item md={8}>
               {error && <p>{error}</p>}
               {!!documents &&
                  <TransactionGrid
                     transactions={documents}
                     filterMonthYear={value.format('MM/YYYY').toString()}
                  />
               }
            </Grid>
         </Grid>
      </Container>
   );
}
