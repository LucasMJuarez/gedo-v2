import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { InputAdornment, IconButton } from '@mui/material';
import { CalendarIcon } from 'lucide-react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({ value, onChange, placeholder = "Seleccionar fecha", className = '' }: DatePickerProps) {
  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onChange?.(newValue.toDate());
    } else {
      onChange?.(undefined);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <MuiDatePicker
        value={value ? dayjs(value) : null}
        onChange={handleChange}
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            placeholder: placeholder,
            fullWidth: true,
            size: "small",
            sx: {
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                cursor: 'pointer',
                '& fieldset': {
                  borderColor: '#D8D8D8',
                  borderRadius: '4px',
                },
                '&:hover fieldset': {
                  borderColor: '#0072C6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#0072C6',
                  borderWidth: '2px',
                },
              },
              '& .MuiOutlinedInput-input': {
                padding: '8px 12px',
                fontSize: '14px',
                color: '#1D1D1B',
                cursor: 'pointer',
                '&::placeholder': {
                  color: '#6C6C6C',
                  opacity: 1,
                },
              },
              '& .MuiInputAdornment-root': {
                marginLeft: '0',
              },
            },
          },
          openPickerIcon: {
            component: () => <CalendarIcon className="w-4 h-4 text-[#6C6C6C]" />,
          },
          openPickerButton: {
            sx: {
              color: '#6C6C6C',
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#0072C6',
              },
            },
          },
          popper: {
            sx: {
              '& .MuiPaper-root': {
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                borderRadius: '6px',
                border: '1px solid #E5E5E5',
                marginTop: '4px',
              },
              '& .MuiPickersDay-root': {
                fontSize: '14px',
                '&.Mui-selected': {
                  backgroundColor: '#0072C6',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#005a9e',
                  },
                  '&:focus': {
                    backgroundColor: '#0072C6',
                  },
                },
                '&:hover': {
                  backgroundColor: '#E3F2FD',
                },
              },
              '& .MuiPickersCalendarHeader-root': {
                paddingTop: '12px',
                paddingBottom: '8px',
                '& .MuiPickersCalendarHeader-label': {
                  color: '#1D1D1B',
                  fontWeight: 600,
                  fontSize: '14px',
                },
                '& .MuiIconButton-root': {
                  color: '#0072C6',
                  '&:hover': {
                    backgroundColor: '#E3F2FD',
                  },
                },
              },
              '& .MuiDayCalendar-weekDayLabel': {
                color: '#6C6C6C',
                fontSize: '12px',
                fontWeight: 500,
              },
            },
          },
          actionBar: {
            actions: [],
          },
        }}
      />
    </LocalizationProvider>
  );
}
