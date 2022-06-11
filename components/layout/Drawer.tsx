import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer  from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { Divider, List, ListItem, Stack, Button} from '@mui/material';
import { NavigationContext} from '../../contexts';
import { drawerWidth } from '../../config';

interface Props {
  window?: () => Window;
}

export default function PermanentDrawerLeft(props: Props) {
  const { window } = props;
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(true);
  const { drawerOpen, toggleDrawerOpen } = useContext(NavigationContext);
  const container = window !== undefined ? () => window().document.body : undefined;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawerContent = (
    <Stack direction="column" spacing={1} sx={{mt:4,}}>
      <Typography>{"@Voting System & Anyone can vote"}</Typography>
      <Box>
          <List>
            <Link href="/" passHref>
                <ListItem key="Create VotingPoll" selected={router.asPath == '/'}>
                <Button>Create Voting Poll</Button>
                </ListItem>
            </Link>
          </List>
      </Box>
      <Box >
          <List>
            <Link href="/vote" passHref>
                <ListItem key="Voting" selected={router.asPath == '/vote'}>
                  <Button>{"Let's Vote"}</Button>
                </ListItem>
            </Link>
          </List>
      </Box>
      <Divider />
    </Stack>
  );
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
            color: 'black',
            padding: '30px 30px 30px 30px',
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
            color: 'black',
            padding: '30px 30px 30px 30px',
            boxSizing: 'border-box', 
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
