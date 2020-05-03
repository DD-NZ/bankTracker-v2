import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const TextInput = ({classes, label, value, onChangeHandler}) => {
  const handleChangeText = (event) => {
    onChangeHandler(event.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <TextField id="outlined-basic" label={label} value={value}variant="outlined" onChange={handleChangeText}/>
    </FormControl>
  );
}

export default TextInput;
