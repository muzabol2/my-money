import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Field } from "formik";
import PropTypes from "prop-types";

import { TextFormField } from "./TextFormField";

export const DatePickerField = ({ label, field, form, ...rest }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <MobileDatePicker
      label={label}
      id={field.name}
      {...rest}
      inputFormat="DD/MM/YYYY"
      value={dayjs(field.value)}
      onChange={(val) => form.setFieldValue(field.name, val)}
      renderInput={(props) => (
        <Field name={field.name} {...props} component={TextFormField} />
      )}
    />
  </LocalizationProvider>
);

DatePickerField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};
