import React from 'react'
import { Field } from "formik";
import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TextFormField } from './TextFormField';

export const DatePickerField = ({ label, field, form, ...rest }) => {

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <MobileDatePicker
            label={label}
            id={field.name}
            {...rest}
            inputFormat="DD/MM/YYYY"
            value={dayjs(field.value)}
            onChange={val => form.setFieldValue(field.name, val)}
            renderInput={props => (
               <Field
                  name={field.name}
                  {...props}
                  component={TextFormField}
               />
            )}
         />
      </LocalizationProvider>
   );
};
