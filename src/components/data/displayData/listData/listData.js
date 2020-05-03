import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from './listItem/listItem'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}));

const ListData = ({data, filters}) => {
  const classes = useStyles();
  const [expanded, setExpanded] =  useState(false);
  return (
    <div className={classes.root}>
      {
        data.map((item,index)=>(
          <ListItem item={item} expanded={expanded===index} index={index} setExpanded={setExpanded} />
        ))
      }
    </div>
  )
}

export default ListData;
