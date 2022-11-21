import { useState } from 'react';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { useFirestore } from '../../hooks/useFirestore';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransactionGridFooterTotalComponent } from "./transactionGridFooter.js";

export default function TransactionGrid({ transactions, filterMonthYear }) {
   const { deleteDocument } = useFirestore('transactions')
   const [total, setTotal] = useState(0);

   const columns = [
      { field: 'transactionName', headerName: 'Name', flex: 2 },
      { field: 'transactionDate', headerName: 'Date', type: 'date', flex: 1 },
      { field: 'transactionCategory', headerName: 'Category', flex: 1 },
      { field: 'amount', headerName: 'Amount', type: 'number', flex: 1 },
      {
         field: 'actions', type: 'actions', flex: 0.5, getActions: (t) => [
            <GridActionsCellItem
               icon={<DeleteIcon />}
               onClick={() => deleteDocument(t.row.id)}
               label="Delete"
            />
         ]
      }
   ];

   const rows = transactions.filter(t => t.transactionDate.slice(-7) === filterMonthYear);

   return (
      <div style={{ height: 750, width: '100%' }}>
         <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
               <DataGrid
                  columns={columns}
                  rows={rows}
                  rowHeight={25}
                  sx={{
                     boxShadow: 2,
                     borderRadius: '10px',
                     border: '2px solid',
                     borderColor: '#1f9751',
                     '& .MuiDataGrid-cell:hover': {
                        color: '#1f9751',
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
         </div>
      </div >
   );
}
