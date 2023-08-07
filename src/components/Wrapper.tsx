import { Box } from "@mui/material";
import Navbar from "./Navbar";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Box mt={10} mb={1}>
        {children}
      </Box>
    </>
  );
}
