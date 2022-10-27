import { getIn } from "formik";
import React from "react";
import './TextFormField.css';

export const TextFormField = ({ label, field, form, ...props }) => {

   const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);

   return (
      <label>
         <span>{label}</span>
         <input
            id={field.name}
            type="text"
            {...field}
            {...props}
            className={!!errorText ? `${field.name}-error__border` : `${field.name}-good__border`}
         />
         {errorText && <p className={`${field.name}-error__p`}>{errorText}</p>}
      </label>
   );
};
