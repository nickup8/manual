import { SelectOption } from '@/types';

import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function SelectFields({
    options,
    label,
    onChange,
    value,
    message,
}: {
    options: SelectOption[];
    label: string;
    onChange: (value: string) => void;
    value: string;
    message?: string;
}) {
    return (
        <div className="">
            <Label>{label}</Label>
            <div>
                <Select value={value} onValueChange={onChange}>
                    <SelectTrigger>
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
            </div>
        </div>
    );
}
