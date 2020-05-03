import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ToolbarContent from './toolbar/toolbar'
import { useTheme } from '@material-ui/core/styles';

const CustomDrawer = ({classes, open, handleDrawerClose, setFilters, data, mode, setMode}) => {
  const theme = useTheme();
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose} color="primary">
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
        <ToolbarContent
          setFilters={setFilters}
          data={data}
          mode={mode}
          setMode={setMode}
        />
    </Drawer>
  );
}

export default CustomDrawer;
