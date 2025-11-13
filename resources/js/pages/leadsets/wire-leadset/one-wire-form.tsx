import FormField from '@/components/form-field';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';

interface Props {
    terminalOne: string;
    terminalTwo: string;
    sealOne: string;
    sealTwo: string;
    wire: string;
    wireName: string;
    setData: (key: string, value: string) => void;
    onSubmit: () => void;
}

export default function OneWireForm({ wire, terminalOne, setData, wireName, terminalTwo, sealOne, sealTwo }: Props) {
    return (
        <form className="flex flex-col space-y-6">
            <div className="flex w-full flex-col space-y-2">
                <HeadingSmall title="Провод" />
                <div className="flex space-x-2">
                    <FormField name="wire" label="YPN провода" requiredIs id="wire" value={wire} onChange={(e) => setData('wire', e.target.value)} />
                    <FormField
                        name="wireName"
                        label="Номер провода"
                        requiredIs
                        id="wireName"
                        value={wireName}
                        onChange={(e) => setData('wireName', e.target.value)}
                    />
                </div>
            </div>
            <div className="flex w-full flex-col space-y-2">
                <HeadingSmall title="Терминалы" />
                <div className="flex space-x-2">
                    <FormField
                        name="terminalOne"
                        label="Терминал 1"
                        requiredIs
                        id="terminalOne"
                        value={terminalOne}
                        onChange={(e) => setData('terminalOne', e.target.value)}
                    />
                    <FormField
                        name="terminalTwo"
                        label="Терминал 2"
                        id="terminalTwo"
                        value={terminalTwo}
                        onChange={(e) => setData('terminalTwo', e.target.value)}
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
                    />
                    <FormField
                        name="sealTwo"
                        label="Уплотнитель 2"
                        id="sealTwo"
                        value={sealTwo}
                        onChange={(e) => setData('sealTwo', e.target.value)}
                    />
                </div>
            </div>
            <div className="flex space-x-2">
                <Button type="submit">Сохранить</Button>
                <Button variant="outline">Отменить</Button>
            </div>
        </form>
    );
}
