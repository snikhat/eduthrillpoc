import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDateTimePicker(props) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
          label="Responsive"
          openTo="year"
          views={['year', 'month', 'day']}
          value={props.selectedDate}
          disablePast
          onChange={(newValue) => {
            props.onDateChange(newValue)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
}
