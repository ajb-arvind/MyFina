import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const TIME_PERIOD = [
  { value: 'week', label: 'Weekly' },
  { value: 'month', label: 'Monthly' },
  { value: 'annual', label: 'Annually' },
  { value: 'period', label: 'Period' },
];

const DateSelection = ({ dateSelection, setDateSelection }) => {
  const [periodSelect, setPeriodSelect] = useState('month');

  const display = () => {
    switch (periodSelect) {
      case 'month':
        return dayjs(dateSelection.fromDate).format('MMM YYYY');
      case 'annual':
        return dayjs(dateSelection.fromDate).format('YYYY');
      case 'week':
        return (
          dayjs(dateSelection.fromDate).format('DD MMM YYYY') +
          ' - ' +
          dayjs(dateSelection.toDate).format('DD MMM YYYY')
        );
    }
  };

  function handleIncreaseDate() {
    switch (periodSelect) {
      case 'month':
        setDateSelection({
          fromDate: dateSelection.fromDate.add(1, 'month'),
          toDate: dateSelection.toDate.add(1, 'month'),
        });
        return;
      case 'annual':
        setDateSelection({
          fromDate: dateSelection.fromDate.add(1, 'year'),
          toDate: dateSelection.toDate.add(1, 'year'),
        });
        return;
      case 'week':
        setDateSelection({
          fromDate: dateSelection.fromDate.add(1, 'week'),
          toDate: dateSelection.toDate.add(1, 'week'),
        });
        return;
    }
  }

  function handleDecreaseDate() {
    switch (periodSelect) {
      case 'month':
        setDateSelection({
          fromDate: dateSelection.fromDate.subtract(1, 'month'),
          toDate: dateSelection.toDate.subtract(1, 'month'),
        });
        return;
      case 'annual':
        setDateSelection({
          fromDate: dateSelection.fromDate.subtract(1, 'year'),
          toDate: dateSelection.toDate.subtract(1, 'year'),
        });
        return;
      case 'week':
        setDateSelection({
          fromDate: dateSelection.fromDate.subtract(1, 'week'),
          toDate: dateSelection.toDate.subtract(1, 'week'),
        });
        return;
    }
  }

  function handleChangePeriodSelection(e) {
    setPeriodSelect(e.target.value);
    switch (e.target.value) {
      case 'month':
        setDateSelection({
          fromDate: dayjs().startOf('month'),
          toDate: dayjs().endOf('month'),
        });
        break;
      case 'annual':
        setDateSelection({
          fromDate: dayjs().startOf('year'),
          toDate: dayjs().endOf('year'),
        });
        break;
      case 'week':
        setDateSelection({
          fromDate: dayjs().startOf('week'),
          toDate: dayjs().endOf('week'),
        });
        break;
      case 'period':
        setDateSelection({
          fromDate: dayjs().startOf('year'),
          toDate: dayjs().endOf('year'),
        });
        break;
    }
  }

  return (
    <>
      <Grid
        item
        xs={12}
        sm={6}
        md={8}
        component="span"
        display="flex"
        alignItems="center"
        gap={2}
      >
        {periodSelect !== 'period' ? (
          <>
            <IconButton color="secondary" onClick={handleDecreaseDate}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="button">{display()}</Typography>
            <IconButton color="secondary" onClick={handleIncreaseDate}>
              <ChevronRightIcon />
            </IconButton>
          </>
        ) : (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="From Date"
                value={dayjs(dateSelection.fromDate)}
                onChange={(newValue) =>
                  setDateSelection({
                    ...dateSelection,
                    fromDate: dayjs(newValue),
                  })
                }
              />
            </DemoContainer>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="To Date"
                value={dayjs(dateSelection.toDate)}
                onChange={(newValue) =>
                  setDateSelection({
                    ...dateSelection,
                    toDate: dayjs(newValue),
                  })
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        marginTop={2}
        paddingLeft={{ xs: 0, sm: 2 }}
      >
        <FormControl fullWidth>
          <InputLabel id="period-select-label">Period</InputLabel>
          <Select
            labelId="period-select-label"
            id="period-simple-select"
            value={periodSelect}
            label="Monthly"
            onChange={handleChangePeriodSelection}
          >
            {TIME_PERIOD.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};
export default DateSelection;
