import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const SelectWidget = ({classes, title, value, options, onChangeHandler}) => {

  const handleChangeSelect = (event) => {
    onChangeHandler(event.target.value);
  };

  return (
    <div className="listItem">
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">{title}</InputLabel>
        <Select
          native
          value={value}
          onChange={handleChangeSelect}
          label={title}
        >
        {
          options.map(option => (
            <option value={option.value} key={option.value}>{option.label}</option>
          ))
        }
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectWidget;
