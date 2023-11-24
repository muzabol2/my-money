import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, Stack, TextField } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import PropTypes from "prop-types";

import { useFirestore } from "hooks";

import { GridFooterTotal } from "./footer";

const TransactionGrid = ({ transactions }) => {
  const { deleteDocument } = useFirestore("transactions");
  const [total, setTotal] = useState(0);
  const [value, setValue] = useState(dayjs("2022-11-01"));
  const [pageSize, setPageSize] = useState(25);

  const columns = [
    { field: "transactionName", headerName: "Name", flex: 2 },
    { field: "transactionDate", headerName: "Date", type: "date", flex: 1 },
    { field: "transactionCategory", headerName: "Category", flex: 1 },
    { field: "amount", headerName: "Amount", type: "number", flex: 1 },
    {
      field: "actions",
      type: "actions",
      flex: 0.5,
      getActions: (t) => [
        <GridActionsCellItem
          key={t.row.id}
          icon={<DeleteIcon />}
          onClick={() => deleteDocument(t.row.id)}
          label="Delete"
        />,
      ],
    },
  ];

  const rows = transactions.filter(
    (t) => t.transactionDate.slice(-7) === value.format("MM/YYYY").toString()
  );

  return (
    <Grid item container direction="column" justifyContent="center">
      <Grid item mt={1}>
        <Stack
          direction="row"
          sx={{ justifyContent: { xs: "center", md: "end" } }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              openTo="month"
              views={["year", "month"]}
              label="Pick a month"
              value={dayjs(value)}
              onChange={(newValue) => setValue(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={null}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: "10px",
                        border: "2px solid",
                        borderColor: "#1f9751",
                      },
                      "&:hover fieldset": {
                        borderColor: "green",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1f9751",
                      },
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Stack>
      </Grid>
      <Grid item>
        <div style={{ height: 700, width: "100%" }}>
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                columns={columns}
                headerHeight={35}
                rows={rows}
                rowHeight={25}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[25, 50, 75, 100]}
                pagination
                sx={{
                  boxShadow: 2,
                  borderRadius: "10px",
                  border: "2px solid",
                  borderColor: "#1f9751",
                  "& .MuiDataGrid-cell:hover": {
                    color: "#1f9751",
                  },
                }}
                components={{ Toolbar: GridFooterTotal }}
                componentsProps={{ toolbar: { total } }}
                onStateChange={(state) => {
                  const visibleRows = state.filter.visibleRowsLookup;
                  let visibleItems = [];

                  for (const [id, value] of Object.entries(visibleRows)) {
                    if (value === true) {
                      visibleItems.push(id);
                    }
                  }
                  const res = rows.filter((item) =>
                    visibleItems.includes(item.id)
                  );
                  const total = res
                    .map((item) => item.amount)
                    .reduce((a, b) => a + b, 0);

                  setTotal(total);
                }}
              />
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default TransactionGrid;

TransactionGrid.propTypes = {
  transactions: PropTypes.array.isRequired,
};
