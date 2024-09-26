import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ButtonBase from "@mui/material/ButtonBase";

// project import
import Logo from "./LogoMain";
import LogoIcon from "./LogoIcon";
import { APP_DEFAULT_PATH } from "config";

export default function LogoSection({ reverse, isIcon, sx, to }) {
  // const { isLoggedIn } = useAuth();
  const isLoggedIn = true;
  return (
    <ButtonBase
      disableRipple
      {...(isLoggedIn && {
        component: Link,
        to: !to ? APP_DEFAULT_PATH : to,
        sx,
      })}
    >
      {isIcon ? <LogoIcon /> : <Logo reverse={reverse} />}
    </ButtonBase>
  );
}

LogoSection.propTypes = {
  reverse: PropTypes.bool,
  isIcon: PropTypes.bool,
  sx: PropTypes.any,
  to: PropTypes.any,
};
