/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  createStyles,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  Theme,
  Typography,
  TypographyProps,
} from '@material-ui/core';
import React, { FC, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textWrapper: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: theme.spacing(2),
    },
    courseTitle: {
      fontWeight: 'bold',
      marginRight: theme.spacing(1),
    },
  }),
);

interface EditableTextProps {
  typography: TypographyProps;
  className?: string;
  text?: string;
  onChange: any;
  placeholder?: string;
}

const EditableText: FC<EditableTextProps> = ({
  typography,
  text,
  onChange,
  placeholder,
}) => {
  const classes = useStyles();

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  if (isEditing) {
    return (
      <Box className={classes.textWrapper}>
        <Input
          id="standard-adornment-password"
          type="text"
          placeholder={placeholder || 'Укажите название курса'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                size="small"
                color="primary"
                aria-label="toggle password visibility"
                onClick={() => {
                  setIsEditing(false);
                  onChange(value);
                }}
              >
                <DoneIcon />
              </IconButton>
              <IconButton
                size="small"
                color="secondary"
                aria-label="toggle password visibility"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>
    );
  }

  return (
    <Box className={classes.textWrapper}>
      <Typography {...typography} className={classes.courseTitle}>
        {text}
      </Typography>
      <IconButton size="small" onClick={() => setIsEditing(true)}>
        <EditIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default EditableText;
