import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

function TransactionGridFooterTotalComponent(props) {
   return (
      <Box style={{ padding: "10px", display: "flex" }}>
         Total : {props.total}
      </Box>
   );
}

TransactionGridFooterTotalComponent.propTypes = {
   total: PropTypes.number
};

export { TransactionGridFooterTotalComponent };
