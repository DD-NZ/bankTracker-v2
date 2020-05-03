import React from 'react';
import ListItem from './../../listData/listItem/listItem'
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const OverlayItem = ({item, setClickedItem, size}) => {
    const classes = useStyles();
  return (
  <Backdrop className={classes.backdrop} open={true} onClick={()=>setClickedItem(undefined)}>
    <ListItem item={item} expanded={true}  setExpanded={setClickedItem} size={size}/>
   </Backdrop>
  )
}

export default OverlayItem;
