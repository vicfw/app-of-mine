import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useRouter } from 'next/router';
import { StarBorder } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import { AppBar, DrawerHeader, Main, sidebarList } from './constants';

interface AdminLayoutProps {
  children?: any;
  header?: string;
}

const drawerWidth = 240;

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, header }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openSubList, setOpenSubList] = React.useState([
    {
      item: 'Ads',
      open: false,
    },
    {
      item: 'test',
      open: false,
    },
  ]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const router = useRouter();

  const splittedRouter = React.useMemo(() => router.pathname.split('/'), []);

  React.useEffect(() => {
    setOpenSubList((perv) => {
      return perv.map((p) => {
        if (router.pathname.includes(p.item.toLowerCase())) {
          p.open = true;
        }
        return p;
      });
    });
  }, [router]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: '#fff ' }}
          >
            {header ?? 'Home'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ justifyContent: 'space-between' }}>
          <Typography
            sx={{
              marginLeft: 6.1,
              fontWeight: 'bold',
              fontSize: 20,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Get Truck
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebarList.map((item, index) => (
            <>
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (!item.subItems?.length) {
                      router.push(`/admin/${item.name.toLowerCase().trim()}`);
                    }
                    setOpenSubList((perv) => {
                      return perv.map((p) => {
                        if (p.item === item.name) p.open = !p.open;
                        return p;
                      });
                    });
                  }}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
              {item.subItems?.length &&
                item.subItems.map((it) => {
                  return (
                    <Collapse
                      in={openSubList[index]?.open}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        <ListItemButton
                          sx={{
                            pl: 4,
                            backgroundColor:
                              splittedRouter[splittedRouter.length - 1] ===
                              it.name.split(' ').join('-').toLowerCase()
                                ? (theme) => theme.palette.primary.main
                                : '',
                            color:
                              splittedRouter[splittedRouter.length - 1] ===
                              it.name.split(' ').join('-').toLowerCase()
                                ? '#fff'
                                : '#000',
                          }}
                          onClick={() =>
                            router.push(
                              `/admin/${item.name.toLowerCase()}/${it.name
                                .split(' ')
                                .join('-')
                                .toLowerCase()}`
                            )
                          }
                        >
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <ListItemText primary={it.name} />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  );
                })}
            </>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default AdminLayout;
