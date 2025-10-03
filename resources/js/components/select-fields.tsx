import { SelectOption } from '@/types';

import InputError from './input-error';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function SelectFields({
    options,
    label,
    onChange,
    value,
    className,
    message,
    required,
    error,
    disabled,
}: {
    options: SelectOption[];
    label: string;
    onChange: (value: string) => void;
    value: string;
    className?: string;
    message?: string;
    required?: boolean;
    error?: string;
    disabled?: boolean;
}) {
    return (
        <div className={className}>
            <Label>
                <span className={disabled ? 'text-muted-foreground' : ''}>
                    {label} {required && <span className="text-red-500">*</span>}
                </span>
            </Label>
            <div className="mt-1">
                <Select value={value} onValueChange={onChange} required={required} disabled={disabled}>
                    <SelectTrigger className={className}>
                        <SelectValue placeholder={message}></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={error} />
            </div>
        </div>
    );
}
