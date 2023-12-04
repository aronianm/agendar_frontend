import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { withAuthGuard } from 'src/hocs/with-auth-guard';
import { ToastContainer, toast } from 'react-toastify';
import { Box } from '@mui/material';
import LoggedInNavigation from '@/components/navigation/LoggedInNavigation';

export const Layout = withAuthGuard((props) => {
  const { children } = props;
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <>
      <ToastContainer />
      <Box sx={{zoom: '90vh', overflow: 'hidden'}}>
          <LoggedInNavigation>
          {children}
          </LoggedInNavigation>
      </Box>
    </>
  );
});
