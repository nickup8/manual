import InputError from './input-error';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function FormField({
    label,
    id,
    name,
    onChange,
    value,
    placeholder,
    error,
    option,
    requiredIs,
    className,
    disabled,
}: {
    label: string;
    id: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    placeholder?: string;
    error?: string;
    option?: { label: string; value: string }[];
    requiredIs?: boolean;
    className?: string;
    disabled?: boolean;
}) {
    return (
        <div className="w-full">
            <Label htmlFor={id}>
                <span className={disabled ? 'text-muted-foreground' : ''}>
                    {label} {requiredIs && <span className="text-red-500">*</span>}
                </span>
            </Label>
            <Input
                disabled={disabled}
                id={id}
                name={name}
                className={'mt-1 block w-full ' + className}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
            />
            {<InputError message={error} />}
        </div>
    );
}
