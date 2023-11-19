import { Container, Grid } from "@mui/material";

import { useAuthContext, useCollection } from "hooks";
import TransactionForm from "./TransactionForm";
import TransactionGrid from "./TransactionGrid";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  return (
    <Container fixed disableGutters>
      <Grid
        item
        container
        direction="row-reverse"
        justifyContent="flex-end"
        alignItems="flex-start"
      >
        <Grid item mt={1} md={3} xs={12}>
          <TransactionForm uid={user.uid} />
        </Grid>
        <Grid item md={9} xs={12}>
          {error && <p>{error}</p>}
          {!!documents && <TransactionGrid transactions={documents} />}
        </Grid>
      </Grid>
    </Container>
  );
}