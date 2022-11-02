import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import { Grid, Container } from '@mui/material';
import './Home.css';

export default function Home() {
   const { user } = useAuthContext();
   const { documents, error } = useCollection(
      'transactions',
      ["uid", "==", user.uid],
      ["createdAt", "desc"]
   );

   return (
      <Container style={{ borderStyle: "dashed", borderColor: "red", margin: '30px auto' }}>
         <Grid container direction="row-reverse" justifyContent="center">
            <Grid item md={4} style={{ borderStyle: "dashed", borderColor: "blue" }}>
               <TransactionForm uid={user.uid} />
            </Grid>
            <Grid item md={8} style={{ borderStyle: "dashed", borderColor: "brown" }}>
               {error && <p>{error}</p>}
               {!!documents &&
                  <TransactionList transactions={documents} />
               }
            </Grid>
         </Grid>
      </Container>
   );
}
