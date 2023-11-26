import { Field, Form, FormikProvider } from "formik";

import { useHelpers } from "./helpers";

import { ButtonsTexts as BT } from "models";

import { ColorButton } from "components";

import { StyledContainer, StyledGrid } from "./styled";

const TransactionForm = ({ uid }: { uid: string }) => {
  const { transactionFormFields, transactionFormik, handleSubmit } =
    useHelpers(uid);

  return (
    <StyledContainer>
      <FormikProvider value={transactionFormik}>
        <Form onSubmit={handleSubmit}>
          <StyledGrid>
            {transactionFormFields.map((field) => (
              <Field key={field.name} {...field} />
            ))}

            <ColorButton type="submit">{BT.ADD_TRANSACTION}</ColorButton>
          </StyledGrid>
        </Form>
      </FormikProvider>
    </StyledContainer>
  );
};

export default TransactionForm;
