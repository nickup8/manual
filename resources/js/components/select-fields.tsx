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
}: {
    options: SelectOption[];
    label: string;
    onChange: (value: string) => void;
    value: string;
    className?: string;
    message?: string;
    required?: boolean;
    error?: string;
}) {
    return (
        <div className="">
            <Label>
                {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <div>
                <Select value={value} onValueChange={onChange} required={required}>
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
