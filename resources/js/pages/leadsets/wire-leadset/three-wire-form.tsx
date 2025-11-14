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

interface ThreeWireFormProps {
    leadsetOne: string;
    leadsetTwo: string;
    leadsetThree: string;
    terminalOne: string;
    terminalTwo: string;
    terminalThree: string;
    terminalFour: string;
    sealOne: string;
    sealFour: string;
    description: string;
    customer: string;
    setData: (key: string, value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    errors: Errors;
    locationWiresOne: string;
    locationWiresTwo: string;
}

export default function ThreeWireForm({
    leadsetOne,
    leadsetTwo,
    leadsetThree,
    terminalOne,
    terminalTwo,
    terminalThree,
    terminalFour,
    sealOne,
    sealFour,
    setData,
    onSubmit,
    description,
    customer,
    errors,
    locationWiresOne,
    locationWiresTwo,
}: ThreeWireFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(e);
    };

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
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <div className="flex w-full flex-col space-y-2">
                <HeadingSmall title="Полуфабрикаты" />
                <div className="flex space-x-2">
                    <div className="w-full">
                        <FormField
                            name="leadsetOne"
                            label="Полуфабрикат 1"
                            onChange={(e) => setData('leadsetOne', e.target.value)}
                            value={leadsetOne}
                            id="leadsetOne"
                            requiredIs
                            className="w-full"
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
                            requiredIs
                            className="w-full"
                        />
                        <InputError message={errors.leadsetTwo} />
                    </div>
                    <div className="w-full">
                        <FormField
                            name="leadsetThree"
                            label="Полуфабрикат 3"
                            onChange={(e) => setData('leadsetThree', e.target.value)}
                            value={leadsetThree}
                            id="leadsetThree"
                            requiredIs
                            className="w-full"
                        />
                        <InputError message={errors.leadsetThree} />
                    </div>
                </div>
                <div className="flex space-x-2">
                    <SelectFields
                        options={locationWiresOption}
                        label="Расположение проводов 1 и 2"
                        onChange={(e) => setData('locationWiresOne', e)}
                        value={locationWiresOne}
                        className="w-full"
                        error={errors.locationWiresOne}
                    />
                    <SelectFields
                        options={locationWiresOption}
                        label="Расположение проводов 2 и 3"
                        onChange={(e) => setData('locationWiresTwo', e)}
                        value={locationWiresTwo}
                        className="w-full"
                        error={errors.locationWiresTwo}
                    />
                </div>
            </div>
            <div className="flex w-full flex-col space-y-2">
                <HeadingSmall title="Терминалы" />

                <div className="flex space-x-2">
                    <div className="w-full">
                        <FormField
                            name="terminalOne"
                            label="Терминал 1"
                            onChange={(e) => setData('terminalOne', e.target.value)}
                            value={terminalOne}
                            id="terminalOne"
                            className="w-full"
                        />
                        <InputError message={errors.terminalOne} />
                    </div>
                    <div className="w-full">
                        <FormField
                            name="terminalTwo"
                            label="Терминал 2"
                            onChange={(e) => setData('terminalTwo', e.target.value)}
                            value={terminalTwo}
                            id="terminalTwo"
                            requiredIs
                            className="w-full"
                        />
                        <InputError message={errors.terminalTwo} />
                    </div>
                    <div className="w-full">
                        <FormField
                            name="terminalThree"
                            label="Терминал 3"
                            onChange={(e) => setData('terminalThree', e.target.value)}
                            value={terminalThree}
                            id="terminalThree"
                            requiredIs
                            className="w-full"
                        />
                        <InputError message={errors.terminalThree} />
                    </div>
                    <div className="w-full">
                        <FormField
                            name="terminalFour"
                            label="Терминал 4"
                            onChange={(e) => setData('terminalFour', e.target.value)}
                            value={terminalFour}
                            id="terminalFour"
                            className="w-full"
                        />
                        <InputError message={errors.terminalFour} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <HeadingSmall title="Уплотнители" />
                <div className="flex space-x-2">
                    <div className="w-full">
                        <FormField
                            name="sealOne"
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
                            name="sealFour"
                            label="Уплотнитель 4"
                            onChange={(e) => setData('sealFour', e.target.value)}
                            value={sealFour}
                            id="sealFour"
                            className="w-full"
                        />
                        <InputError message={errors.sealFour} />
                    </div>
                </div>
            </div>
            <div>
                <HeadingSmall title="Информация" />
                <div className="flex space-x-2">
                    <div className="w-full">
                        <FormField
                            name="description"
                            label="Описание"
                            onChange={(e) => setData('description', e.target.value)}
                            value={description}
                            id="description"
                            className="w-full"
                        />
                        <InputError message={errors.description} />
                    </div>
                    <div className="w-full">
                        <FormField
                            name="customer"
                            label="Клиент"
                            onChange={(e) => setData('customer', e.target.value)}
                            value={customer}
                            id="customer"
                            className="w-full"
                        />
                        <InputError message={errors.customer} />
                    </div>
                </div>
            </div>
            <div>
                <Label htmlFor="notes">Примечания</Label>
                <Textarea name="notes" onChange={(e) => setData('notes', e.target.value)} value={''} id="notes" className="w-full" />
            </div>
            <div className="flex space-x-2">
                <Button variant={'default'} type="submit">
                    Сохранить
                </Button>
                <Button variant={'outline'}>Отменить</Button>
            </div>
        </form>
    );
}
