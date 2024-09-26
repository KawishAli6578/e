import React, { useId, useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import FieldLabel from "./FieldLabel";
import IconButton from "components/@extended/IconButton";

function FormInput(props) {
  const {
    id,
    name,
    type = "text",
    value = "",
    onChange = () => {},
    onBlur = () => {},
    onFocus = () => {},
    placeholder = "",
    fullWidth = true,
    className = "",
    label = "",
    disabled = false,
    error = false,
    isRequired = false,
    endAdornment = null,
    startAdornment = null,
    size = "medium",
    multiline = false,
    step = 0.01,
    sx = {},
    maxRows,
    minRows,
    rows = 1,
    minDate,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const rId = useId();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const passwordProps =
    type === "password"
      ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                color="secondary"
                size="large"
                type="button"
              >
                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </IconButton>
            </InputAdornment>
          ),
        }
      : {};

  const changeHandler = (e) => {
    if (type === "number") {
      const val = e.target.value;
      e.target.value = val.replace(/[^0-9.]/g, ""); // Allow only numbers and decimals
      onChange(e);
    } else if (type === "phone") {
      const val = e.target.value;
      // Allow only numbers, spaces, dashes, parentheses, and plus sign
      e.target.value = val.replace(/[^0-9\s\-\(\)\+]/g, "");
      onChange(e);
    } else {
      onChange(e);
    }
  };

  return (
    <Stack sx={{ width: "100%", ...sx }} spacing={1}>
      {!!label && (
        <FieldLabel id={id ?? rId} label={label} isRequired={isRequired} />
      )}
      <Box>
        <OutlinedInput
          id={id ?? rId}
          type={type === "password" && showPassword ? "text" : type}
          value={value ?? ""}
          name={name}
          onBlur={onBlur}
          disabled={disabled}
          onChange={disabled ? () => {} : changeHandler}
          onFocus={onFocus}
          placeholder={placeholder}
          fullWidth={fullWidth}
          error={Boolean(error)}
          className={className}
          endAdornment={endAdornment}
          startAdornment={startAdornment}
          size={size}
          multiline={multiline}
          autoComplete={String(rId)}
          {...passwordProps}
          inputProps={{
            ...(type === "number" ? { step } : {}),
            ...(minDate ? { min: minDate } : {}),
          }}
          sx={{
            ...sx,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#d5cccc",
            },
          }}
          maxRows={maxRows}
          rows={rows}
          minRows={minRows}
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
      </Box>
    </Stack>
  );
}

FormInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "email", "password", "phone"]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  isRequired: PropTypes.bool,
  multiline: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  endAdornment: PropTypes.node,
  startAdornment: PropTypes.node,
  size: PropTypes.oneOf(["medium", "small"]),
  sx: PropTypes.object,
  maxRows: PropTypes.number,
  rows: PropTypes.number,
  minRows: PropTypes.number,
  minDate: PropTypes.string,
  step: PropTypes.number,
};

export default FormInput;
