import { Field, Form, FormikProvider } from "formik";

import { useHelpers } from "./helpers";

import { ButtonsTexts as BT } from "models";

import { StyledButton, StyledContainer, StyledGrid } from "./styled";

const TransactionForm = ({ uid }: { uid: string }) => {
  const { transactionFormFields, transactionFormik } = useHelpers(uid);

  return (
    <StyledContainer>
      <FormikProvider value={transactionFormik}>
        <Form onSubmit={transactionFormik.handleSubmit}>
          <StyledGrid>
            {transactionFormFields.map((field) => (
              <Field key={field.name} {...field} />
            ))}

            <StyledButton type="submit">{BT.ADD_TRANSACTION}</StyledButton>
          </StyledGrid>
        </Form>
      </FormikProvider>
    </StyledContainer>
  );
};

export default TransactionForm;
