import { Grid, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { Field, Form, FormikProvider, useFormik } from "formik";

import { categoriesSchema, validateYupSchemaMultiErrors } from "utils";
import { useAuthContext, useCollection, useFirestore } from "hooks";

import { PagesTexts as PT, ButtonsTexts as BT } from "enums";
import { GO_BACK_BELOW_TEXTS } from "consts";

import { BelowTextBox, ColorButton, TextFormField } from "components";
import { DeleteIcon } from "icons";

import {
  StyledContainer,
  StyledErrorMsg,
  StyledFormContainer,
  StyledTitle,
  StyledWrapper,
} from "./styled";

const Categories = () => {
  const { user } = useAuthContext();
  const { categories, error } = useCollection("users", ["uid", "==", user.uid]);
  const { updateCategories, deleteCategories } = useFirestore("users");

  const categoriesFormik = useFormik({
    initialValues: {
      categories: "",
    },
    validate: (values) =>
      validateYupSchemaMultiErrors(values, categoriesSchema),
    onSubmit: (values) => {
      updateCategories({ id: user.uid, category: values.categories });
      resetForm();
    },
  });

  const { isSubmitting, handleSubmit, resetForm } = categoriesFormik;

  return (
    <StyledWrapper>
      <StyledFormContainer>
        <FormikProvider value={categoriesFormik}>
          <Form onSubmit={handleSubmit}>
            <StyledContainer>
              <StyledTitle>{PT.TRANSACTION_CATEGORIES}</StyledTitle>
              <List>
                {categories?.map((category: string) => (
                  <ListItem
                    key={category}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() =>
                          deleteCategories({ id: user.uid, category })
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={category} />
                  </ListItem>
                ))}
              </List>

              <Grid
                sx={{ flexGrow: 1 }}
                item
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={1}
              >
                <Grid item xs={8}>
                  <Field
                    style={{ width: "170px" }}
                    name="categories"
                    component={TextFormField}
                  />
                </Grid>
                <Grid item mt={1} xs={4}>
                  <ColorButton
                    style={{ width: "10px", height: "40px" }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {BT.ADD}
                  </ColorButton>
                </Grid>
              </Grid>
              {error && <StyledErrorMsg>{error}</StyledErrorMsg>}
            </StyledContainer>
          </Form>
        </FormikProvider>
      </StyledFormContainer>

      <BelowTextBox texts={GO_BACK_BELOW_TEXTS} />
    </StyledWrapper>
  );
};

export default Categories;
