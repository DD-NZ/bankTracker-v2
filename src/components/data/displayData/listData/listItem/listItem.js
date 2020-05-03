import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DisplayTable from './table/table'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '25%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const ListItem = ({item, expanded, index, setExpanded, size}) => {
  const classes = useStyles();
  const handleChange = (panel) => (event, expanded) => {
    setExpanded(expanded ? panel : false);
  };
  console.log(item);
  return (
    <ExpansionPanel
      expanded={expanded}
      onChange={handleChange(index)}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>{item.start + " to " + item.end}</Typography>
        <Typography className={classes.secondaryHeading}>{item.total.toFixed(2)}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
              <DisplayTable data={item.transactions} size={size}/>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )

}

export default ListItem;
