import {
   FormControl,
   FormHelperText,
   InputLabel,
   MenuItem,
   Select,
} from '@mui/material';
import { getIn } from "formik";
import React from "react";

export const SelectFormField = ({ field, form, label, options, ...props }) => {

   const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);

   return (
      <FormControl error={!!errorText} >
         {label && <InputLabel>{label}</InputLabel>}
         <Select
            style={{ backgroundColor: 'white', width: 220, maxWidth: 'md' }}
            label={label}
            {...field}
            {...props}>
            {options?.map((op, index) => (
               <MenuItem key={index} value={op}>
                  {op}
               </MenuItem>
            ))}
         </Select>
         <FormHelperText error>{errorText}</FormHelperText>
      </FormControl>
   );
};
