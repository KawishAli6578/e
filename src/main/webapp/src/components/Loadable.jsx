import { Suspense } from 'react';

// project import
import Loader from './Loader';
import { Box } from '@mui/material';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => (props) => {
  return (
    <Suspense
      fallback={
        <>
          <Loader />
          <Box textAlign="center">
            <Loader.Spinner />
          </Box>
        </>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
