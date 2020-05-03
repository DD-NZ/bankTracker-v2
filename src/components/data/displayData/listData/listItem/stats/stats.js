import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useTheme} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '15%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const Stats = ({type, from, to, total}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.heading}>{total+ " to " + to}</Typography>
      <Typography className={classes.secondaryHeading}>{total}</Typography>
    </div>
  )
}


export default Stats;
