import { storeThreeLeadset } from '@/actions/App/Http/Controllers/LeadsetController';
import FormField from '@/components/form-field';
import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import SelectFields from '@/components/select-fields';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Leadset, PropsResponse } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import ThreeWireLeadset from './wire-leadset/three-wire-leadset';

interface FormData {
    wireCount: number;
    leadsetNumber: string;
    leadsetOne: string;
    leadsetTwo: string;
    leadsetThree: string;
    terminalOne: string;
    terminalTwo: string;
    terminalThree: string;
    terminalFour: string;
    customer: string;
    notes: string;
    description: string;
    locationWiresOne: string;
    locationWiresTwo: string;
    sealOne: string;
    sealFour: string;
}

export default function LeadSetCreateThree({ leadsets }: { leadsets: PropsResponse<Leadset> }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Полуфабрикаты', href: '/leadsets' },
        { title: 'Создание полуфабриката', href: '/leadsets/create' },
        { title: 'Создание двойного марьяжа', href: '/leadsets/create/leadset-create-three' },
    ];

    const { data, setData, errors, processing, setError, transform, submit } = useForm<FormData>({
        wireCount: 3,
        leadsetNumber: '',
        leadsetOne: '',
        leadsetTwo: '',
        leadsetThree: '',
        terminalOne: '',
        terminalTwo: '',
        terminalThree: '',
        terminalFour: '',
        customer: '',
        notes: '',
        description: '',
        locationWiresOne: '',
        locationWiresTwo: '',
        sealOne: '',
        sealFour: '',
    });

    const selectOptions = [
        { label: 'Внакладку', value: 'inside' },
        { label: 'Рядом', value: 'near' },
    ];

    // Поиск leadset по номеру
    const findLeadset = (leadsetNumber: string) =>
        leadsets.data.filter((leadset: Leadset) => leadset.leadsetNumber.toLowerCase() === leadsetNumber.toLowerCase())[0];

    // Проверка leadset на существование и одиночность
    const validateLeadset = (leadsetNumber: string, field: keyof FormData) => {
        if (leadsetNumber.length < 10) return;

        const foundLeadset = findLeadset(leadsetNumber);

        if (!foundLeadset) {
            setError(field, 'Такого полуфабриката не существует');
        } else if (foundLeadset.relatedLeadsets?.length > 0) {
            setError(field, 'Это не одиночный провод');
        } else if (foundLeadset.terminals?.length > 1) {
            setError(field, `На обоих концах полуфабриката имеются терминалы, проверьте правильность выбора`);
        } else {
            setError(field, ''); // Очистить ошибку
        }
    };

    // useEffect для проверки leadsetOne, leadsetTwo, leadsetThree
    useEffect(() => {
        validateLeadset(data.leadsetOne, 'leadsetOne');
    }, [data.leadsetOne]);

    useEffect(() => {
        const selectedLeadsetTwo = findLeadset(data.leadsetTwo);

        if (data.leadsetTwo.length >= 10) {
            if (!selectedLeadsetTwo) {
                setError('leadsetTwo', 'Такого полуфабриката не существует');
                return;
            }

            if (selectedLeadsetTwo.relatedLeadsets?.length > 0) {
                setError('leadsetTwo', 'Это не одиночный провод');
                return;
            }

            if (selectedLeadsetTwo.terminals?.length > 0) {
                setError('leadsetTwo', 'Полуфабрикат имеет терминалы, проверьте правильность выбора');
                return;
            }
        }

        setError('leadsetTwo', ''); // Все проверки пройдены
    }, [data.leadsetTwo]);

    useEffect(() => {
        validateLeadset(data.leadsetThree, 'leadsetThree');
    }, [data.leadsetThree]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        transform((data) => ({
            ...data,
            customer: data.customer.toUpperCase(),
            leadsetNumber: data.leadsetNumber.toUpperCase(),
            leadsetOne: data.leadsetOne.toUpperCase(),
            leadsetTwo: data.leadsetTwo.toUpperCase(),
            leadsetThree: data.leadsetThree.toUpperCase(),
        }));

        submit(storeThreeLeadset());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Создание двойного марьяжа" />
            <div className="px-6 py-6">
                <Heading title="Создание двойного марьяжа" />
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    {/* Номер полуфабриката */}
                    <div className="w-full">
                        <FormField
                            name="leadsetNumber"
                            label="Номер полуфабриката (S - номер)"
                            onChange={(e) => setData('leadsetNumber', e.target.value)}
                            value={data.leadsetNumber}
                            requiredIs
                            id="leadsetNumber"
                        />
                        <InputError message={errors.leadsetNumber} className="mt-2" />
                    </div>

                    {/* Визуализация провода */}
                    <div className="flex w-full justify-center">
                        <ThreeWireLeadset
                            leadsetOne={findLeadset(data.leadsetOne)}
                            leadsetTwo={findLeadset(data.leadsetTwo)}
                            leadsetThree={findLeadset(data.leadsetThree)}
                            terminalOne={data.terminalOne}
                            terminalTwo={data.terminalTwo}
                            terminalThree={data.terminalThree}
                            terminalFour={data.terminalFour}
                            sealOne={data.sealOne}
                            sealFour={data.sealFour}
                            locationWiresTwo={data.locationWiresTwo}
                            locationWiresOne={data.locationWiresOne}
                        />
                    </div>

                    {/* Полуфабрикаты */}
                    <div className="flex flex-col space-y-2">
                        <HeadingSmall title="Полуфабрикаты" />
                        <div className="flex space-x-2">
                            <div className="w-full">
                                <FormField
                                    name="leadsetOne"
                                    label="Полуфабрикат 1 (верхний)"
                                    onChange={(e) => setData('leadsetOne', e.target.value)}
                                    value={data.leadsetOne}
                                    requiredIs
                                    id="leadsetOne"
                                />
                                <InputError message={errors.leadsetOne} className="mt-2" />
                            </div>
                            <div className="w-full">
                                <FormField
                                    name="leadsetTwo"
                                    label="Полуфабрикат 2 (средний)"
                                    onChange={(e) => setData('leadsetTwo', e.target.value)}
                                    value={data.leadsetTwo}
                                    requiredIs
                                    id="leadsetTwo"
                                />
                                <InputError message={errors.leadsetTwo} className="mt-2" />
                            </div>
                            <div className="w-full">
                                <FormField
                                    name="leadsetThree"
                                    label="Полуфабрикат 3 (нижний)"
                                    onChange={(e) => setData('leadsetThree', e.target.value)}
                                    value={data.leadsetThree}
                                    requiredIs
                                    id="leadsetThree"
                                />
                                <InputError message={errors.leadsetThree} className="mt-2" />
                            </div>
                        </div>

                        {/* Расположение проводов */}
                        <div className="flex space-x-2">
                            <div className="w-full">
                                <SelectFields
                                    options={selectOptions}
                                    onChange={(e) => setData('locationWiresOne', e)}
                                    value={data.locationWiresOne}
                                    label="Расположение проводов 1 и 2"
                                    required
                                />
                                <InputError message={errors.locationWiresOne} className="mt-2" />
                            </div>
                            <div className="w-full">
                                <SelectFields
                                    options={selectOptions}
                                    onChange={(e) => setData('locationWiresTwo', e)}
                                    value={data.locationWiresTwo}
                                    label="Расположение проводов 2 и 3"
                                    required
                                />
                                <InputError message={errors.locationWiresTwo} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    {/* Терминалы */}
                    <div className="flex flex-col space-y-2">
                        <HeadingSmall title="Терминалы" />
                        <div className="flex space-x-2">
                            <div className="w-full">
                                <FormField
                                    name="terminalTwo"
                                    label="Терминал 1"
                                    onChange={(e) => setData('terminalTwo', e.target.value)}
                                    value={data.terminalTwo}
                                    id="terminalTwo"
                                    requiredIs
                                />
                                <InputError message={errors.terminalTwo} className="mt-2" />
                            </div>
                            <div className="w-full">
                                <FormField
                                    name="terminalThree"
                                    label="Терминал 2"
                                    onChange={(e) => setData('terminalThree', e.target.value)}
                                    value={data.terminalThree}
                                    id="terminalThree"
                                    requiredIs
                                />
                                <InputError message={errors.terminalThree} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    {/* Информация */}
                    <div className="flex flex-col space-y-2">
                        <HeadingSmall title="Информация" />
                        <div className="flex space-x-2">
                            <div className="w-full">
                                <FormField
                                    name="description"
                                    label="Описание"
                                    onChange={(e) => setData('description', e.target.value)}
                                    value={data.description}
                                    id="description"
                                />
                            </div>
                            <div className="w-full">
                                <FormField
                                    name="customer"
                                    label="Клиент"
                                    onChange={(e) => setData('customer', e.target.value)}
                                    value={data.customer}
                                    id="customer"
                                    requiredIs
                                />
                                <InputError message={errors.customer} className="mt-2" />
                            </div>
                        </div>
                        <div className="w-full">
                            <Label htmlFor="notes">Примечания</Label>
                            <Textarea name="notes" onChange={(e) => setData('notes', e.target.value)} value={data.notes} id="notes" rows={4} />
                        </div>
                    </div>

                    {/* Кнопки */}
                    <div className="flex space-x-2">
                        <Button type="submit" disabled={processing}>
                            Создать
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
