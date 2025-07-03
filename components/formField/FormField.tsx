'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

interface OptionRoleProps {
  value: string;
  label: string;
}

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string; // label
  placeholder?: string; // placeholder input
  type?: 'text' | 'password' | 'select' | 'file' | 'date' | 'textarea' | 'number'; // type input
  optionsRole?: OptionRoleProps[]; // select role
  rows?: number;
  disabled?: boolean;
  onChangeCustom?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | number | string) => void;
}

const FormField = <T extends FieldValues>({ control, name, type = 'text', label, placeholder, optionsRole, onChangeCustom, rows, disabled }: FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          if (type === 'file') {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              field.onChange(file); // kirim FileList ke react-hook-form
              onChangeCustom?.(e as React.ChangeEvent<HTMLInputElement>); // trigger preview
            }
          } else {
            field.onChange(e);
          }
        };

        return (
          <FormItem className="flex flex-col justify-center">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {type === 'select' && optionsRole ? (
                <Select
                  // onValueChange={field.onChange} value={field.value ?? ''}
                  onValueChange={(val) => {
                    const foundOption = optionsRole.find((opt) => opt.value === val || String(opt.value) === val);
                    const shouldBeNumber = typeof foundOption?.value === 'number';

                    field.onChange(shouldBeNumber ? Number(val) : val);
                    onChangeCustom?.(val);
                  }}
                  value={field.value ? String(field.value) : ''}
                >
                  <SelectTrigger className="w-full" disabled={disabled}>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {optionsRole.map((option) => (
                      <SelectItem key={option.value} value={String(option.value)}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : type === 'file' ? (
                <Input type="file" name={field.name} ref={field.ref} onChange={handleChange} className="w-full" />
              ) : type === 'textarea' ? (
                <textarea {...field} rows={rows} placeholder={placeholder} className="w-full rounded border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              ) : type === 'number' ? (
                <Input
                  type="number"
                  placeholder={placeholder}
                  value={field.value ?? ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === '' ? '' : Number(val));
                  }}
                  className="w-full"
                />
              ) : (
                <Input type={type} placeholder={placeholder} {...field} className="w-full" disabled={disabled} />
              )}
            </FormControl>
            <FormMessage className="text-[14px]">{fieldState.error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};

export default FormField;
