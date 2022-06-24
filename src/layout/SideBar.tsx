import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import NewList from '../components/NewList';
import Drawer from '@mui/material/Drawer';
import ListOfLists from '../components/ListOfLists';
import React, { useContext } from 'react';
import Toolbar from '@mui/material/Toolbar';
import { useState, useEffect } from 'react';
import { ListContext } from '../context/todo-list-context';
const drawerWidth = 240;

const SideBar = () => {
  const { categories } = useContext(ListContext);

  console.log(categories);
  return (
    <React.Fragment>
      <AppBar
        position='fixed'
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          // width: `calc(100% - ${drawerWidth}px)`,
          // ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            To do
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
            backgroundColor: '#dedede',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Toolbar />
        <Divider />
        <ListOfLists items={categories} />
        <NewList />
      </Drawer>
    </React.Fragment>
  );
};

export default SideBar;
