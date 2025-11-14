import FormField from '@/components/form-field';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Errors {
    [key: string]: string;
}

interface Props {
    terminalOne: string;
    terminalTwo: string;
    sealOne: string;
    sealTwo: string;
    wire: string;
    wireName: string;
    customer: string;
    setData: (key: string, value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    description: string;
    notes: string;
    errors: Errors;
}

export default function OneWireForm({
    wire,
    terminalOne,
    setData,
    wireName,
    terminalTwo,
    sealOne,
    sealTwo,
    onSubmit,
    description,
    customer,
    notes,
    errors,
}: Props) {
    return (
        <form className="flex flex-col space-y-4">
            <div className="flex w-full flex-col space-y-2">
                <HeadingSmall title="Провод" />
                <div className="flex space-x-2">
                    <div className="w-full">
                        <FormField
                            name="wire"
                            label="YPN провода"
                            requiredIs
                            id="wire"
                            value={wire}
                            onChange={(e) => setData('wire', e.target.value)}
                            className="w-full"
                        />
                        <InputError message={errors.wire} />
                    </div>
                    <div className="w-full">
                        <FormField
                            name="wireName"
                            label="Номер провода"
                            requiredIs
                            id="wireName"
                            value={wireName}
                            onChange={(e) => setData('wireName', e.target.value)}
                            className="w-full"
                        />
                        <InputError message={errors.wireName} />
                    </div>
                </div>
            </div>
            <div className="flex w-full flex-col space-y-2">
                <HeadingSmall title="Терминалы" />
                <div className="flex space-x-2">
                    <div className="w-full">
                        <FormField
                            name="terminalOne"
                            label="Терминал 1"
                            requiredIs
                            id="terminalOne"
                            value={terminalOne}
                            onChange={(e) => setData('terminalOne', e.target.value)}
                            className="w-full"
                        />
                        <InputError message={errors.terminalOne} />
                    </div>
                    <FormField
                        name="terminalTwo"
                        label="Терминал 2"
                        id="terminalTwo"
                        value={terminalTwo}
                        onChange={(e) => setData('terminalTwo', e.target.value)}
                        className="w-full"
                    />
                </div>
            </div>
            <div className="flex w-full flex-col space-y-2">
                <HeadingSmall title="Уплотнители" />
                <div className="flex space-x-2">
                    <FormField
                        name="sealOne"
                        label="Уплотнитель 1"
                        id="sealOne"
                        value={sealOne}
                        onChange={(e) => setData('sealOne', e.target.value)}
                        className="w-full"
                    />
                    <FormField
                        name="sealTwo"
                        label="Уплотнитель 2"
                        id="sealTwo"
                        value={sealTwo}
                        onChange={(e) => setData('sealTwo', e.target.value)}
                        className="w-full"
                    />
                </div>
            </div>
            <div>
                <HeadingSmall title="Информация" />
                <div className="flex space-x-2">
                    <div className="w-full">
                        <FormField
                            name="description"
                            label="Описание"
                            id="description"
                            value={description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="flex-1"
                        />
                    </div>
                    <div className="w-full">
                        <FormField
                            name="customer"
                            label="Заказчик"
                            id="customer"
                            value={customer}
                            onChange={(e) => setData('customer', e.target.value)}
                            className="w-full"
                        />
                        <InputError message={errors.customer} />
                    </div>
                </div>
            </div>
            <div>
                <Label htmlFor="notes">Примечания</Label>
                <Textarea name="notes" id="notes" value={notes} onChange={(e) => setData('notes', e.target.value)} />
            </div>
            <div className="flex space-x-2">
                <Button type="submit" onClick={onSubmit}>
                    Сохранить
                </Button>
                <Button variant="outline" type="button">
                    Отменить
                </Button>
            </div>
        </form>
    );
}
