import { Field, Form, FormikProvider, useFormik } from "formik";

import {
  formatDate,
  generateCurrentDate,
  toNumber,
  transactionSchema,
} from "utils";
import { useCollection, useFirestore } from "hooks";

import { ButtonsTexts as BT } from "enums";

import {
  ColorButton,
  DatePickerField,
  SelectFormField,
  TextFormField,
} from "components";

import { StyledContainer, StyledGrid } from "./styled";

const TransactionForm = ({ uid }: { uid: string }) => {
  const { addDocument } = useFirestore("transactions");
  const { categories } = useCollection("users", ["uid", "==", uid]);

  const transactionFormik = useFormik({
    initialValues: {
      transactionName: "",
      transactionDate: generateCurrentDate(),
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
    <StyledContainer>
      <FormikProvider value={transactionFormik}>
        <Form onSubmit={handleSubmit}>
          <StyledGrid>
            <Field
              label="Transaction name"
              name="transactionName"
              component={TextFormField}
            />
            <Field
              label="Date"
              name="transactionDate"
              component={DatePickerField}
            />
            <Field
              label="Category"
              name="transactionCategory"
              component={SelectFormField}
              options={categories}
            />
            <Field label="Amount" name="amount" component={TextFormField} />

            <ColorButton type="submit">{BT.ADD_TRANSACTION}</ColorButton>
          </StyledGrid>
        </Form>
      </FormikProvider>
    </StyledContainer>
  );
};

export default TransactionForm;
