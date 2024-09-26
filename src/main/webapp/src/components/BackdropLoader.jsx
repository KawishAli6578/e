import { styled } from '@mui/material/styles';

import Loader from './Loader';
import Logo from './logo/LogoMain';

const BackdropWrapper = styled('div')(() => ({
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  zIndex: 2001,
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(5px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
}));

const BackdropLoader = () => (
  <>
    <BackdropWrapper>
      <Logo />
    </BackdropWrapper>
    <Loader />
  </>
);

export default BackdropLoader;
