import DeleteIcon from "@mui/icons-material/Delete";
import {
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Field, Form, FormikProvider, useFormik } from "formik";

import { categoriesSchema, validateYupSchemaMultiErrors } from "utils";
import { useAuthContext, useCollection, useFirestore } from "hooks";
import { BelowTextBox, ColorButton, TextFormField } from "components";
import { PagesTexts as PT, ButtonsTexts as BT } from "enums";

const Categories = () => {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("users", ["uid", "==", user.uid]);
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
    <Container>
      <FormikProvider value={categoriesFormik}>
        <Form onSubmit={handleSubmit} className="form-container">
          <Grid item mb={2} align="left">
            <Typography
              variant="h6"
              sx={{ fontFamily: "Arial", fontWeight: "bold" }}
            >
              {PT.TRANSACTION_CATEGORIES}
            </Typography>
          </Grid>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <List>
                {documents?.[0]?.categories.map((category) => (
                  <ListItem
                    key={category.toString()}
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
            </Grid>

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
            <Grid item>{error && <p>{error}</p>}</Grid>
          </Grid>
        </Form>
      </FormikProvider>
      <BelowTextBox texts={[{ name: "", link: "/", linkName: BT.BACK }]} />
    </Container>
  );
};

export default Categories;
