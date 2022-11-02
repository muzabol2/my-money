import { getIn } from "formik";
import React from "react";
import {
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   FormHelperText,
} from '@mui/material';

export const SelectFormField = ({ field, form, label, options, ...props }) => {

   const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);

   return (
      <FormControl error={!!errorText} >
         {label && <InputLabel>{label}</InputLabel>}
         <Select
            style={{ backgroundColor: 'white', width: 225, maxWidth: 'md' }}
            {...field}
            {...props}>
            {options.map(op => (
               <MenuItem key={op.value} value={op.value}>
                  {op.label}
               </MenuItem>
            ))}
         </Select>
         <FormHelperText error>{errorText}</FormHelperText>
      </FormControl>
   );
};
