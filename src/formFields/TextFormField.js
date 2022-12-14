import { FormControl, FormHelperText, TextField } from "@mui/material";
import { getIn } from "formik";
import React from "react";

export const TextFormField = ({ label, field, form, ...props }) => {

   const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);

   return (
      <FormControl error={!!errorText}>
         <TextField
            fullWidth
            style={{ backgroundColor: 'white', width: '220px' }}
            label={label}
            id={field.name}
            type="text"
            {...field}
            {...props}
            error={!!errorText}
         />
         {errorText && <FormHelperText error>{errorText}</FormHelperText>}
      </FormControl>
   );
};
