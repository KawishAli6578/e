import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useConfig from "hooks/useConfig";

// ==============================|| MAIN LAYOUT ||============================== //

export default function AuthLayout() {
  const { container } = useConfig();

  return (
    <>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box
          component="main"
          sx={{
            width: "calc(100% - 260px)",
            flexGrow: 1,
            background:
              "linear-gradient(133deg, rgba(117,235,140,1) 0%, rgba(60,145,115,1) 100%)",
          }}
        >
          <Container
            maxWidth={container ? "xl" : false}
            sx={{
              ...(container && { px: { xs: 0, sm: 2 } }),
              position: "relative",
              minHeight: "calc(100vh - 110px)",
              display: "flex",
              justifyContent: "center",

              alignItems: "center",
              height: "100vh",
              backgroundImage: `url("/layout/Background.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Box sx={{}}>
              <Outlet />
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
