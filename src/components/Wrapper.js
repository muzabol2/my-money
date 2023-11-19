import { Box } from "@mui/material";
import PropTypes from "prop-types";

import { Navbar } from "components";

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

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
