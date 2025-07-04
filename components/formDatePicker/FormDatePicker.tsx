'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface FormDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
}

export function FormDatePicker<T extends FieldValues>({ control, name, label, minDate, maxDate }: FormDatePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const valueAsDate = field.value ? new Date(field.value) : undefined;

        return (
          <FormItem className="flex flex-col">
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={`w-full justify-start text-left font-normal ${!field.value ? 'text-muted-foreground' : ''}`}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {valueAsDate ? format(valueAsDate, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={valueAsDate}
                    onSelect={(date) => {
                      if (date) field.onChange(date.toLocaleDateString('en-CA'));
                    }}
                    disabled={(date) => ((minDate && date < minDate) || (maxDate && date > maxDate) ? true : false)}
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
