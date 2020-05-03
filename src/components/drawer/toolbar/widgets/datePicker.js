import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';



const DatePicker = ({classes, label, value, onChangeHandler}) => {

  const handleDateChange = (date) => {
    onChangeHandler(date);
  };

  return (
    <div className="listItem">
    <FormControl variant="outlined" className={classes.formControl}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} >
          <KeyboardDatePicker
            className={classes.datePicker}
            disableToolbar
            variant="inline"
            format="dd-MM-yyyy"
            margin="normal"
            id={"date-picker-inline-"+label}
            label={label}
            value={value}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
      </MuiPickersUtilsProvider>
    </FormControl>
    </div>
  );
}

export default  DatePicker;
