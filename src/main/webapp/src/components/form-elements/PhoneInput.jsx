import PhoneInput2 from "react-phone-input-2";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";

import FieldLabel from "./FieldLabel";

export default function PhoneInput(props) {
  const {
    value = "",
    placeholder = "",
    disabled = false,
    onChange = () => {},
    error = "",
    label = "",
    isRequired = false,
    id,
  } = props;
  return (
    <>
      <Stack spacing={1}>
        {!!label && (
          <FieldLabel id={id} label={label} isRequired={isRequired} />
        )}
        <Box>
          <PhoneInput2
            country={"ca"}
            value={value}
            placeholder={placeholder}
            onChange={(...args) => {
              !disabled && onChange(...args);
            }}
            disabled={disabled}
            // For Error
            inputStyle={{
              width: "100%",
              padding: "10.5px 14px 10.5px 48px",
              height: "41px",
            }}
            containerStyle={{ width: "100%", height: "41px" }}
            // override some configs
            disableCountryGuess={true}
            countryCodeEditable={false}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
        </Box>
      </Stack>
    </>
  );
}

PhoneInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  id: PropTypes.string,
};
