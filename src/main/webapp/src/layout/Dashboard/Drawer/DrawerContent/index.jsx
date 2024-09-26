// project import
import NavUser from "./NavUser.jsx";
import Navigation from "./Navigation";
import SimpleBar from "components/third-party/SimpleBar";

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  return (
    <>
      <SimpleBar
        sx={{
          "& .simplebar-content": { display: "flex", flexDirection: "column" },
        }}
      >
        <Navigation />
      </SimpleBar>
      <NavUser />
    </>
  );
}
