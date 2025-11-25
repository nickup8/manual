import FormField from '@/components/form-field';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import SelectFields from '@/components/select-fields';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Errors {
    [key: string]: string;
}

interface TwoWireFormProps {
    leadsetOne: string;
    leadsetTwo: string;
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
    notes: string;
    disabledTerminalOne: boolean;
    disabledTerminalThree: boolean;
}

export default function TwoWireForm({
    terminalOne,
    setData,
    terminalTwo,
    terminalThree,
    sealOne,
    sealThree,
    onSubmit,
    description,
    customer,
    errors,
    locationWiresOne,
    leadsetOne,
    leadsetTwo,
    notes,
    disabledTerminalOne,
    disabledTerminalThree,
}: TwoWireFormProps) {
    const locationWiresOption = [
        {
            label: 'Внакладку',
            value: 'inside',
        },
        {
            label: 'Рядом',
            value: 'near',
        },
    ];

    return (
        <form onSubmit={onSubmit} className="flex flex-col space-y-4">
            <div>
                <HeadingSmall title="Полуфабрикаты" />
                <div className="flex space-x-2">
                    <div className="w-full">
                        <FormField
                            name="leadsetOne"
                            label="Полуфабрикат 1"
                            onChange={(e) => setData('leadsetOne', e.target.value)}
                            value={leadsetOne}
                            id="leadsetOne"
                            className="w-full"
                            requiredIs
                        />
                        <InputError message={errors.leadsetOne} />
                    </div>
                    <div className="w-full">
                        <FormField
                            name="leadsetTwo"
                            label="Полуфабрикат 2"
                            onChange={(e) => setData('leadsetTwo', e.target.value)}
                            value={leadsetTwo}
                            id="leadsetTwo"
                            className="w-full"
                            requiredIs
                        />
                        <InputError message={errors.leadsetTwo} />
                    </div>
                    <div className="w-full">
                        <SelectFields
                            options={locationWiresOption}
                            label="Расположение проводов 1 и 2"
                            onChange={(e) => setData('locationWiresOne', e)}
                            value={locationWiresOne}
                            className="w-full"
                            error={errors.locationWiresOne}
                        />
                    </div>
                </div>
            </div>
            <div>
                <HeadingSmall title="Терминалы" />
                <div className="flex space-x-2">
                    <div className="w-full">
                        <FormField
                            name={'terminalOne'}
                            label="Терминал 1"
                            onChange={(e) => setData('terminalOne', e.target.value)}
                            value={terminalOne}
                            id="terminalOne"
                            className="w-full"
                            disabled={disabledTerminalOne}
                        />
                        <InputError message={errors.terminalOne} />
                    </div>
                    <div className="w-full">
                        <FormField
                            name={'terminalTwo'}
                            label="Терминал 2"
                            onChange={(e) => setData('terminalTwo', e.target.value)}
                            value={terminalTwo}
                            id="terminalTwo"
                            className="w-full"
                            requiredIs
                        />
                        <InputError message={errors.terminalTwo} />
                    </div>
                    <div className="w-full">
                        <FormField
                            name={'terminalThree'}
                            label="Терминал 3"
                            onChange={(e) => setData('terminalThree', e.target.value)}
                            value={terminalThree}
                            id="terminalThree"
                            className="w-full"
                            disabled={disabledTerminalThree}
                        />
                        <InputError message={errors.terminalThree} />
                    </div>
                </div>
            </div>
            <div>
                <HeadingSmall title="Уплотнители" />
                <div className="flex space-x-2">
                    <div className="w-full">
                        <FormField
                            name={'sealOne'}
                            label="Уплотнитель 1"
                            onChange={(e) => setData('sealOne', e.target.value)}
                            value={sealOne}
                            id="sealOne"
                            className="w-full"
                        />
                        <InputError message={errors.sealOne} />
                    </div>
                    <div className="w-full">
                        <FormField
                            name={'sealThree'}
                            label="Уплотнитель 3"
                            onChange={(e) => setData('sealThree', e.target.value)}
                            value={sealThree}
                            id="sealThree"
                            className="w-full"
                        />
                        <InputError message={errors.sealThree} />
                    </div>
                </div>
            </div>
            <div>
                <HeadingSmall title="Информация" />
                <div className="flex space-x-2">
                    <FormField
                        name={'description'}
                        label="Описание"
                        onChange={(e) => setData('description', e.target.value)}
                        value={description}
                        id="description"
                        className="w-full"
                    />
                    <div className="w-full">
                        <FormField
                            name={'customer'}
                            label="Клиент"
                            onChange={(e) => setData('customer', e.target.value)}
                            value={customer}
                            id="customer"
                            className="w-full"
                            requiredIs
                        />
                        <InputError message={errors.customer} />
                    </div>
                </div>
            </div>
            <div>
                <Label htmlFor="notes">Примечание</Label>
                <Textarea className="mt-1" id="notes" name="notes" onChange={(e) => setData('notes', e.target.value)} value={notes} />
            </div>
            <div className="flex space-x-2">
                <Button type="submit">Сохранить</Button>
            </div>
        </form>
    );
}
