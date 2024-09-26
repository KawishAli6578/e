import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ==============================|| COMING SOON - MAIN ||============================== //

export default function ComingSoon() {
  return (
    <Grid container spacing={4} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh', py: 2 }}>
      <Grid item xs={12}>
        <Stack spacing={1} justifyContent="center" alignItems="center" sx={{ mt: -2 }}>
          <Typography align="center" variant="h1">
            Coming Soon
          </Typography>
          <Typography align="center" color="text.secondary">
            Something new is on its way
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
