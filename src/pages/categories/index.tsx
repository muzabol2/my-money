import { Field, Form, FormikProvider } from "formik";

import { useHelpers } from "./helpers";

import { PagesTexts as PT, ButtonsTexts as BT } from "models";
import { GO_BACK_BELOW_TEXTS } from "consts";

import { BelowTextBox, TextFormField } from "components";
import { DeleteIcon } from "icons";

import * as $ from "./styled";

const Categories = () => {
  const {
    consts: { userId, categories, error, categoriesFormik, isSubmitting },
    funcs: { deleteCategories },
  } = useHelpers();

  return (
    <$.StyledWrapper>
      <$.StyledFormContainer>
        <FormikProvider value={categoriesFormik}>
          <Form onSubmit={categoriesFormik.handleSubmit}>
            <$.StyledContainer>
              <$.StyledTitle>{PT.TRANSACTION_CATEGORIES}</$.StyledTitle>
              <$.StyledList>
                {categories?.map((category: string) => (
                  <$.StyledListItem key={category}>
                    <$.StyledListItemText>{category}</$.StyledListItemText>
                    <$.StyledIconButton
                      type="button"
                      onClick={() => deleteCategories({ id: userId, category })}
                    >
                      <DeleteIcon />
                    </$.StyledIconButton>
                  </$.StyledListItem>
                ))}
              </$.StyledList>

              <$.StyledInputContainer>
                <Field
                  style={{ width: "150px" }}
                  name="categories"
                  label="categories"
                  component={TextFormField}
                />

                <$.StyledButton type="submit" disabled={isSubmitting}>
                  {BT.ADD}
                </$.StyledButton>
              </$.StyledInputContainer>

              {error && <$.StyledErrorMsg>{error}</$.StyledErrorMsg>}
            </$.StyledContainer>
          </Form>
        </FormikProvider>
      </$.StyledFormContainer>

      <BelowTextBox texts={GO_BACK_BELOW_TEXTS} />
    </$.StyledWrapper>
  );
};

export default Categories;
