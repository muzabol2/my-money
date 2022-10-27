import { getIn } from "formik";
import { TextField } from '@mui/material';
import React from "react";
import { styled } from '@mui/material/styles';

// TODO: adjust styles - maybe Box?
const CssTextField = styled(TextField)({
   '& label.Mui-focused': {
      color: 'white',
   },
   '& .MuiInput-underline:after': {
      borderButtonColor: 'white',
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         borderBlockColor: 'white',
      },
      '&:hover fieldset': {
         borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
         borderColor: 'green',
         color: "white",
      },
   },
});

export const TextFormField = ({ field, form, ...props }) => {
   const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);
   console.log("first", field, form, props);
   return (
      <CssTextField
         margin="normal"
         helperText={errorText}
         error={!!errorText}
         {...field}
         {...props}
      />
   );
};



{/* <Grid>
<Field
   name="transactionName"
   component={TextFormField}
   label="Transaction name"
/>
</Grid>

<Grid>
<Field
   name="amount"
   component={TextFormField}
   label="Amount (PLN)"
   />
</Grid> */}
