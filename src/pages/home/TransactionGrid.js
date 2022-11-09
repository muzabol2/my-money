import { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useFirestore } from '../../hooks/useFirestore';
import { Button } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { TransactionGridFooterTotalComponent } from "./transactionGridFooter.js";

export default function TransactionGrid({ transactions, filterMonthYear }) {
   const { deleteDocument } = useFirestore('transactions')
   const [total, setTotal] = useState(0);

   const columns = [
      { field: 'transactionDate', headerName: 'Date', width: 125, minWidth: 150, maxWidth: 200 },
      { field: 'transactionName', headerName: 'Name', width: 125, minWidth: 150, maxWidth: 200 },
      { field: 'transactionCategory', headerName: 'Category', minWidth: 120 },
      { field: 'amount', headerName: 'Amount', minWidth: 120 },
      {
         field: 'actions', headerName: 'Actions', width: 100, renderCell: (t) => {
            return (
               <Button size="small" >
                  <RemoveIcon onClick={() => deleteDocument(t.row.id)} />
               </Button>
            );
         }
      }
   ];

   const rows = transactions.filter(t => t.transactionDate.slice(-7) === filterMonthYear);

   return (
      <div style={{ height: 400, width: '100%' }}>
         <DataGrid
            columns={columns}
            rows={rows}
            sx={{
               boxShadow: 2,
               border: 2,
               borderColor: 'green',
               '& .MuiDataGrid-cell:hover': {
                  color: 'green',
               },
            }}
            components={{
               Toolbar: GridToolbar,
               Footer: TransactionGridFooterTotalComponent
            }}
            componentsProps={{
               footer: { total }
            }}
            onStateChange={(state) => {
               const visibleRows = state.filter.visibleRowsLookup;
               let visibleItems = [];
               for (const [id, value] of Object.entries(visibleRows)) {
                  if (value === true) {
                     visibleItems.push(id);
                  }
               }
               const res = rows.filter((item) => visibleItems.includes(item.id));
               const total = res
                  .map((item) => item.amount)
                  .reduce((a, b) => a + b, 0);
               setTotal(total);
            }}
         />
      </div>
   );
}
