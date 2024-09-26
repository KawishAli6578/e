import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PropTypes from 'prop-types';

export default function DateSelector(props) {
  const { value, onChange, format = 'dd/MM/yyyy', disableFuture, disablePast } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        format={format}
        value={value ? new Date(value) : value}
        onChange={onChange}
        sx={{ width: '100%' }}
        disableFuture={disableFuture}
        disablePast={disablePast}
      />
    </LocalizationProvider>
  );
}
DateSelector.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  format: PropTypes.string,
  disableFuture: PropTypes.bool,
  disablePast: PropTypes.bool
};
