import { Container, Grid } from "@mui/material";
import dayjs from "dayjs";
import { Field, Form, FormikProvider, useFormik } from "formik";
import PropTypes from "prop-types";

import { transactionSchema } from "utils";
import { useCollection, useFirestore } from "hooks";
import {
  ColorButton,
  DatePickerField,
  SelectFormField,
  TextFormField,
} from "components";
import { ButtonsTexts as BT } from "enums";

const TransactionForm = ({ uid }) => {
  const { addDocument } = useFirestore("transactions");
  const { documents } = useCollection("users", ["uid", "==", uid]);

  const toNumber = (amount) => Number(amount.replace(/,/, "."));
  const formatDate = (date) => dayjs(date).format("DD/MM/YYYY").toString();

  const categories = documents?.[0]?.categories;

  const transactionFormik = useFormik({
    initialValues: {
      transactionName: "",
      transactionDate: dayjs().toString(),
      transactionCategory: "",
      amount: "",
    },
    validationSchema: transactionSchema,
    onSubmit: ({
      transactionName,
      transactionDate,
      transactionCategory,
      amount,
    }) => {
      addDocument({
        uid,
        transactionName,
        transactionDate: formatDate(transactionDate),
        transactionCategory,
        amount: toNumber(amount),
      });
      resetForm();
    },
  });

  const { handleSubmit, resetForm } = transactionFormik;

  return (
    <div>
      <FormikProvider value={transactionFormik}>
        <Form onSubmit={handleSubmit}>
          <Container
            style={{
              backgroundColor: "#effaf0",
              borderRadius: "10px",
              border: "2px solid",
              borderColor: "#1f9751",
              width: "270px",
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item mt={3} mb={1}>
                <Field
                  label="Transaction name"
                  name="transactionName"
                  component={TextFormField}
                />
              </Grid>
              <Grid item mb={1}>
                <Field
                  label="Date"
                  name="transactionDate"
                  component={DatePickerField}
                />
              </Grid>
              <Grid item mb={1}>
                <Field
                  label="Category"
                  name="transactionCategory"
                  component={SelectFormField}
                  options={categories}
                />
              </Grid>
              <Grid item mb={1}>
                <Field label="Amount" name="amount" component={TextFormField} />
              </Grid>
              <Grid item mb={3}>
                <ColorButton type="submit">{BT.ADD_TRANSACTION}</ColorButton>
              </Grid>
            </Grid>
          </Container>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default TransactionForm;

TransactionForm.propTypes = {
  uid: PropTypes.string.isRequired,
};
