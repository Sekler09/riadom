import { Calendar } from '@repo/ui/components/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/popover';
import { cn } from '@repo/ui/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

type BirthDatePickerProps = {
  id: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
};

const formatBirthDate = (date: Date) =>
  date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const BirthDatePicker = ({
  id,
  value,
  onChange,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
}: BirthDatePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover modal={false} open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        id={id}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        aria-required="true"
        className={cn(
          'flex h-12 w-full items-center justify-between border border-border/70 bg-background px-4 text-base transition-colors duration-200',
          'hover:border-foreground/30',
          'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
          'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
          !value && 'text-muted-foreground',
        )}
      >
        {value ? formatBirthDate(value) : 'select your date of birth'}
        <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
      </PopoverTrigger>

      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={value}
          defaultMonth={value}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export { BirthDatePicker };
