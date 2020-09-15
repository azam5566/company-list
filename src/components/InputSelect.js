import React, { useState, useRef, useEffect } from 'react';
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
  },
}));

export default function InputSelect({
  className,
  label,
  listLabel,
  required,
  list,
  fullWidth,
  ...restProps
}) {
  const classes = useStyles();
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  const handleData = (data, key) => {
    if (listLabel && key === 'value') {
      return data;
    }
    if (typeof data === 'object' && data !== null) {
      return data[key];
    } else {
      return data;
    }
  };

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl
      className={`${className} ${classes.root}`}
      fullWidth={fullWidth}
    >
      <InputLabel ref={inputLabel}>
        {`${label || ''} ${(required && '*') || ''}`}
      </InputLabel>
      <Select labelWidth={labelWidth} {...restProps}>
        {list.map((l) => (
          <MenuItem value={handleData(l, 'value')} key={handleData(l, 'value')}>
            {handleData(l, listLabel || 'text')}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
