import React, {useEffect, useState} from 'react';
import List from '@material-ui/core/List';
import DatePicker from './widgets/datePicker';
import SelectWidget from './widgets/select';
import TextInput from './widgets/textInput'
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import debounce from 'lodash.debounce';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 240,
    maxWidth: 240,
  },
  icon: {
    margin: theme.spacing(2)
  }
}));

const descendingSelect = [
  {
    label: "Descending",
    value: "descending"
  }, {
    label: "Ascending",
    value: "ascending"
  }
]

const graphSelect = [
  {
    label: "Bar Chart",
    value: "bar-chart"
  }, {
    label: "Line Graph",
    value: "line-graph"
  }
]

const timeSelect = [
  {
    label: "Week",
    value: "week"
  }, {
    label: "Month",
    value: "month"
  }
]

const ToolbarContent = ({setFilters, data, mode, setMode}) => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [direction, setDirection] = useState("descending");
  const [search, setSearch] = useState(undefined);
  const [graph, setGraph] = useState("bar-chart")
  const [time, setTime] = useState("week")

  useEffect(() => {
    if(data){
      setStartDate(Date.parse(data.weekValues[0].start))
      setEndDate(Date.parse(data.weekValues[data.weekValues.length-1].start))

    }
  }, [data])

  useEffect(() => {
    debounce(setFilters,400)({
      startDate,
      endDate,
      direction,
      search,
      graph,
      time
    });
  }, [search])

  useEffect(() => {
      setFilters({
      startDate,
      endDate,
      direction,
      search,
      graph,
      time
    })
  }, [mode, startDate, endDate, direction, graph, time])

  return (
    <List style={{textAlign:"center"}}>
      <IconButton
        color= {mode === "display-list" ? "primary" : "inherit"}
        aria-label="open drawer"
        edge="start"
        className={classes.icon}
        onClick={() => setMode("display-list")}
      >
        <FormatListBulletedIcon />
      </IconButton>
      <IconButton
        color= {mode === "display-graph" ? "primary" : "inherit"}
        aria-label="open drawer"
        edge="start"
        className={classes.icon}
        onClick={() => setMode("display-graph")}
      >
        <EqualizerIcon />
      </IconButton>
      <Divider />
      { mode === "display-list" ? <TextInput classes={classes} label="Search" value={search} onChangeHandler={setSearch} /> : null}
      { mode === "display-list" ? <SelectWidget classes={classes} title="Direction" value={direction} options={descendingSelect} onChangeHandler={setDirection} /> : null}
      { mode === "display-graph" ? <SelectWidget classes={classes} title="Graph" value={graph} options={graphSelect} onChangeHandler={setGraph} /> : null}
      <SelectWidget classes={classes} title="Time Period" value={time} options={timeSelect} onChangeHandler={setTime} />
      <DatePicker classes={classes} label="End Date" value={endDate} onChangeHandler={setEndDate}/>
      <DatePicker classes={classes} label="Start Date" value={startDate} onChangeHandler={setStartDate}/>
    </List>
  );
}

export default ToolbarContent;
