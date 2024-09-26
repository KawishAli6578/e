// material-ui
import { LoadingOutlined } from '@ant-design/icons';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material/styles';

// ==============================|| Loader ||============================== //

export default function Loader() {
  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, zIndex: 2001, width: '100%' }}>
      <LinearProgress color="primary" />
    </Box>
  );
}

function Spinner({ style = {} }) {
  const theme = useTheme();
  return <LoadingOutlined style={{ color: theme.palette.primary.main, fontSize: '1.25rem', ...style }} />;
}

Loader.Spinner = Spinner;
