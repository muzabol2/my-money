import { useFirestore } from '../../hooks/useFirestore';
import dayjs from 'dayjs';
import { Fab, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Title from '../../components/Title';
import './Home.css';


export default function TransactionList({ transactions }) {
   const { deleteDocument } = useFirestore('transactions')

   const sum = transactions.reduce((accumulator, transaction) => {
      return accumulator + Number(transaction.amount);
   }, 0);

   const formatDate = (date) => dayjs(date).format('DD/MM/YYYY');

   const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
         backgroundColor: "#effaf0",
         color: "#1f9751",
         fontWeight: 'bold',
      },
      [`&.${tableCellClasses.body}`]: {
         fontSize: 14,
      },
   }));

   return (
      <Grid>
         <h2>Sum: {sum.toFixed(2)} PLN</h2>
         <Title>Transactions</Title>
         <Table size="small">
            <TableHead>
               <TableRow>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Category</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {transactions.map(t => (
                  <TableRow key={t.id}>
                     <TableCell>{formatDate(t.date)}</TableCell>
                     <TableCell>{t.transactionName}</TableCell>
                     <TableCell>{t.transactionCategory}</TableCell>
                     <TableCell align="right">{`${t.amount} PLN`}</TableCell>
                     <TableCell align="center">
                        <Fab size="small" color="inherit" style={{ color: "#effaf0" }}>
                           <DeleteRoundedIcon style={{ color: "#1f9751" }} onClick={() => deleteDocument(t.id)} />
                        </Fab>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </Grid>
   );
}
