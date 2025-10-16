import { useState } from 'react';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({ value, onChange, placeholder = "Seleccionar fecha", className = '' }: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={`
            flex items-center justify-between
            w-full px-3 py-2
            bg-white border border-[#D8D8D8] rounded
            text-[#1D1D1B]
            hover:border-[#0072C6]
            focus:outline-none focus:ring-2 focus:ring-[#0072C6] focus:border-transparent
            transition-colors
            ${!value ? 'text-[#6C6C6C]' : ''}
            ${className}
          `}
        >
          <span>
            {value ? formatDate(value) : placeholder}
          </span>
          <CalendarIcon className="w-4 h-4 text-[#6C6C6C]" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange?.(date);
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
