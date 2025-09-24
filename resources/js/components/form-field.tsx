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
}) {
    return (
        <div className="w-full">
            <Label htmlFor={id}>
                {label} {requiredIs && <span className="text-red-500">*</span>}
            </Label>
            <Input id={id} name={name} className={'mt-1 block w-full ' + className} onChange={onChange} value={value} placeholder={placeholder} />
            {<InputError message={error} />}
        </div>
    );
}
