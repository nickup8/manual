interface Errors {
    [key: string]: string;
}

interface TwoWireFormProps {
    terminalOne: string;
    terminalTwo: string;
    terminalThree: string;
    sealOne: string;
    sealThree: string;
    setData: (key: string, value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    description: string;
    customer: string;
    errors: Errors;
    locationWiresOne: string;
}

export default function TwoWireForm({
    terminalOne,
    setData,
    terminalTwo,
    sealOne,
    sealThree,
    onSubmit,
    description,
    customer,
    errors,
    locationWiresOne,
}: TwoWireFormProps) {
    return <div>TwoWireForm</div>;
}
