import React from "react";
import PropTypes from "prop-types";

import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";

function FieldLabel(props) {
  const { id, label, isRequired } = props;
  return (
    <InputLabel
      htmlFor={id}
      sx={{ textAlign: "start", fontWeight: "600", color: "#4c4c4c" }}
    >
      {label}
      {isRequired && (
        <Typography variant="caption" color={"red"}>
          *
        </Typography>
      )}
    </InputLabel>
  );
}

FieldLabel.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default FieldLabel;
