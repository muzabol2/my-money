import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import * as React from "react";

function TransactionGridFooterTotalComponent(props) {
   return (
      <Box style={{ justifyContent: "end", padding: "5px 20px", display: "flex", fontWeight: 'bold' }}>
         Total : {props.total.toFixed(2)}
      </Box>
   );
}

TransactionGridFooterTotalComponent.propTypes = {
   total: PropTypes.number
};

export { TransactionGridFooterTotalComponent };
