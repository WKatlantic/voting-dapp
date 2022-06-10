import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer  from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { Divider, List, ListItem, ListItemText, Stack } from '@mui/material';
import { NavigationContext} from '../../contexts';
import { drawerWidth } from '../../config';

import {CgLaptop} from 'react-icons/cg';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function PermanentDrawerLeft(props: Props) {
  const { window } = props;
  const router = useRouter();
  // const [addr, setAddr] = React.useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(true);
  // const { connect, disconnect, account } = useContext(Web3ModalContext);
  const { drawerOpen, toggleDrawerOpen } = useContext(NavigationContext);
  const container = window !== undefined ? () => window().document.body : undefined;

  const boxItemStyle = {
    background: 'linear-gradient(to bottom, rgba(78, 94, 238, 0.25), rgba(228,122, 231, 0.25))',
    borderRadius: 3,
    pl:1,
    pr:1,
  }
  const listItemStyle = {
    paddingLeft: 2,
    justifyContent:'space-between',
    display:'flex',
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Stack direction="column" spacing={1} sx={{mt:4,}}>
      <Typography>@Voting System & Anyone can vote</Typography>

      <Box sx={boxItemStyle}>
          <List>
            <Link href="/" passHref>
                <ListItem button key="Create VotingPoll" selected={router.asPath == '/'}>
                  <CgLaptop/>
                  <ListItemText sx={listItemStyle} primary="Create VotingPoll"/>
                </ListItem>
            </Link>
          </List>
      </Box>

      <Box sx={boxItemStyle}>
          <List>
            <Link href="/vote" passHref>
                <ListItem button key="Voting" selected={router.asPath == '/vote'}>
                  <CgLaptop/>
                  <ListItemText sx={listItemStyle} primary="Let's Vote"/>
                </ListItem>
            </Link>
          </List>
      </Box>

      <Divider />
    </Stack>

  );

  // const classes = makeStyles();
  return (
    <>
      <Drawer
        open={drawerOpen}
        variant="temporary"
        container={container}
        ModalProps={{
          keepMounted: false, // Better open performance on mobile.
        }}
        onClose={toggleDrawerOpen}
        sx={{
          display: { xs: 'block', sm: 'block' },
          width: drawerWidth, 
          '& .MuiDrawer-paper': {
            color: 'white',
            padding: '30px 30px 30px 30px',
            background: '#261D4C',
            boxSizing: 'border-box', 
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>
      
      <Drawer
        open
        variant="permanent"
        container={container}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'none', sm: 'none', md: 'block' },
          width: drawerWidth,
          '& .MuiDrawer-paper': { 
            width: drawerWidth,
            color: 'white',
            padding: '30px 30px 30px 30px',
            background: '#261D4C',
            boxSizing: 'border-box', 
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
