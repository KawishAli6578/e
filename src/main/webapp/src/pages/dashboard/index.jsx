import { Grid } from "@mui/material";
import ComingSoon from "pages/coming-soon";
import React from "react";

const Dashboard = () => {
  return (
    <Grid container>
      <Grid item xl={12} lg={12} md={12}>
        <ComingSoon />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
