import { Box } from "@mui/material";
import Navbar from "./components/Navbar";

export default function Wrapper({ children }) {
  return (
    <>
      <Navbar />
      <Box mt={10} mb={1}>
        {children}
      </Box>
    </>
  );
}
