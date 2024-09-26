import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';

function FormSwitch(props) {
  const { value = false, onChange = () => {}, label = '', disabled = false, error = false, className = '', labelPlacement = 'end' } = props;
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            disabled={disabled}
            checked={value}
            onChange={disabled ? () => {} : onChange}
            className={`${className} ${error ? 'text-bg-danger' : ''}`}
          />
        }
        label={label ? <span>{label}</span> : null}
        labelPlacement={labelPlacement}
        sx={label ? {} : { m: 0 }}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </>
  );
}

FormSwitch.propTypes = {
  label: PropTypes.node,
  className: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  placeholder: PropTypes.string
};

export default FormSwitch;
