import InputError from './input-error';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function FormField({
    label,
    id,
    name,
    onChange,
    value,
    error,
}: {
    label: string;
    id: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    error?: string;
}) {
    return (
        <div className="w-full">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} name={name} className="mt-1 block w-full" onChange={onChange} value={value} />
            {<InputError message={error} />}
        </div>
    );
}
