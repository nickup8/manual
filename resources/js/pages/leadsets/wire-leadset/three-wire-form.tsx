import FormField from '@/components/form-field';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';

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
    setData: (key: string, value: string) => void;
    onSubmit: () => void;
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
}: ThreeWireFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            <div className="flex w-full flex-col space-y-2">
                <HeadingSmall title="Полуфабрикаты" />
                <div className="flex space-x-2">
                    <FormField
                        name="leadsetOne"
                        label="Полуфабрикат 1"
                        onChange={(e) => setData('leadsetOne', e.target.value)}
                        value={leadsetOne}
                        id="leadsetOne"
                        requiredIs
                    />
                    <FormField
                        name="leadsetTwo"
                        label="Полуфабрикат 2"
                        onChange={(e) => setData('leadsetTwo', e.target.value)}
                        value={leadsetTwo}
                        id="leadsetTwo"
                        requiredIs
                    />
                    <FormField
                        name="leadsetThree"
                        label="Полуфабрикат 3"
                        onChange={(e) => setData('leadsetThree', e.target.value)}
                        value={leadsetThree}
                        id="leadsetThree"
                        requiredIs
                    />
                </div>
            </div>
            <div className="flex w-full flex-col space-y-2">
                <HeadingSmall title="Терминалы" />

                <div className="flex space-x-2">
                    <FormField
                        name="terminalOne"
                        label="Терминал 1"
                        onChange={(e) => setData('terminalOne', e.target.value)}
                        value={terminalOne}
                        id="terminalOne"
                    />
                    <FormField
                        name="terminalTwo"
                        label="Терминал 2"
                        onChange={(e) => setData('terminalTwo', e.target.value)}
                        value={terminalTwo}
                        id="terminalTwo"
                        requiredIs
                    />
                    <FormField
                        name="terminalThree"
                        label="Терминал 3"
                        onChange={(e) => setData('terminalThree', e.target.value)}
                        value={terminalThree}
                        id="terminalThree"
                        requiredIs
                    />
                    <FormField
                        name="terminalFour"
                        label="Терминал 4"
                        onChange={(e) => setData('terminalFour', e.target.value)}
                        value={terminalFour}
                        id="terminalFour"
                    />
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <HeadingSmall title="Уплотнители" />
                <div className="flex space-x-2">
                    <FormField
                        name="sealOne"
                        label="Уплотнитель 1"
                        onChange={(e) => setData('sealOne', e.target.value)}
                        value={sealOne}
                        id="sealOne"
                    />
                    <FormField
                        name="sealFour"
                        label="Уплотнитель 4"
                        onChange={(e) => setData('sealFour', e.target.value)}
                        value={sealFour}
                        id="sealFour"
                    />
                </div>
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
