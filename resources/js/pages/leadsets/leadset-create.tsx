import Heading from '@/components/heading';
import SelectFields from '@/components/select-fields';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PropsResponse, Wire } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface FormData {
    leadsetNumber: string;
    leadsetOne: string;
    leadsetTwo: string;
    leadsetThree: string;
    terminalOne: string;
    terminalTwo: string;
    terminalThree: string;
    terminalFour: string;
    sealOne: string;
    sealTwo: string;
    sealThree: string;
    sealFour: string;
    wire: string;
    wireName: string;
    wireCount: string;
    customer: string;
    description: string;
    notes: string;
    locationWiresTwo: string;
    locationWiresOne: string;
}

export default function LeadsetCreate({ wires }: { wires: PropsResponse<Wire> }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Полуфабрикаты',
            href: '/leadsets',
        },
        {
            title: 'Создание полуфабриката',
            href: '/leadsets/create',
        },
    ];

    const [wireCounter, setWireCounter] = useState(1);
    const [proccesing, setProccesing] = useState(false);

    const [enter, setEnter] = useState(false);

    const { data, setData, reset } = useForm<FormData>({
        leadsetNumber: '',
        leadsetOne: '',
        leadsetTwo: '',
        leadsetThree: '',
        terminalOne: '',
        terminalTwo: '',
        terminalThree: '',
        terminalFour: '',
        sealOne: '',
        sealTwo: '',
        sealThree: '',
        sealFour: '',
        wire: '',
        wireName: '',
        wireCount: wireCounter.toString(),
        customer: '',
        description: '',
        notes: '',
        locationWiresTwo: '',
        locationWiresOne: '',
    });

    const heandleChange = (key: string, value: string) => {
        setData({
            ...data,
            [key]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post(
            '/leadsets',
            {
                ...data,
                customer: data.customer.toUpperCase(),
                wire: data.wire.toUpperCase(),
                wireCount: Number(data.wireCount),
            },
            {
                onSuccess: () => {
                    alert('Leadset успешно создан');
                },
                onError: (errors) => {
                    console.error('Ошибки валидации:', errors);
                },
            },
        );
    };

    const wireRequest = wires.data.filter((wireReq: Wire) => wireReq.wire_code === data.wire);

    const errors = usePage().props.errors;

    const resetForm = () => {
        reset();
        setEnter(false);
    };

    const viewLeadsetOptions = [
        { value: '1', label: 'Одиночный провод' },
        { value: '2', label: 'Марьяж' },
        { value: '3', label: 'Двойной марьяж' },
    ];

    const handleContinue = () => {
        let route = '';

        switch (wireCounter) {
            case 1:
                route = '/leadsets/create/leadset-create-one'; // или route('leadsets.create.one')
                break;
            case 2:
                route = '/leadsets/create/leadset-create-two'; // или route('leadsets.create.two')
                break;
            case 3:
                route = '/leadsets/create/leadset-create-three'; // или route('leadsets.create.three')
                break;
            default:
                return;
        }

        router.visit(route);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Создание полуфабриката" />
            <div className="px-4 py-6">
                <Heading title="Создание полуфабриката" />
                {/* <div className="mt-8">
                    <div className="flex space-x-4">
                        <FormField
                            label="Номер полуфабриката"
                            value={data.leadsetNumber}
                            onChange={(e) => heandleChange('leadsetNumber', e.target.value)}
                            className="w-full"
                            requiredIs
                            disabled={enter}
                            id="leadsetNumber"
                            name="leadsetNumber"
                        />
                        <SelectFields
                            label="Количество проводов"
                            value={wireCounter.toString()}
                            onChange={(e) => {
                                setWireCounter(Number(e));
                                heandleChange('wireCount', e);
                            }}
                            options={[
                                { value: '1', label: '1' },
                                { value: '2', label: '2' },
                                { value: '3', label: '3' },
                            ]}
                            className="w-full"
                            disabled={enter}
                            required={false}
                        />
                    </div>
                    <div className="mt-10 flex items-center justify-center">
                        {wireCounter === 1 ? (
                            <OneWireLeadset
                                terminalOne={data.terminalOne}
                                terminalTwo={data.terminalTwo}
                                sealOne={data.sealOne}
                                sealTwo={data.sealTwo}
                                wire={data.wire}
                                wireName={data.wireName}
                                wireRequired={wireRequest[0]}
                            />
                        ) : wireCounter === 3 ? (
                            <ThreeWireLeadset
                                leadsetOne={data.leadsetOne}
                                leadsetTwo={data.leadsetTwo}
                                leadsetThree={data.leadsetThree}
                                terminalOne={data.terminalOne}
                                terminalTwo={data.terminalTwo}
                                terminalThree={data.terminalThree}
                                terminalFour={data.terminalFour}
                                sealOne={data.sealOne}
                                sealFour={data.sealFour}
                                locationWiresTwo={data.locationWiresTwo}
                                locationWiresOne={data.locationWiresOne}
                            />
                        ) : (
                            <TwoWireLeadSet
                                terminalOne={data.terminalOne}
                                terminalTwo={data.terminalTwo}
                                terminalThree={data.terminalThree}
                                sealOne={data.sealOne}
                                sealThree={data.sealThree}
                                leadsetOne={data.leadsetOne}
                                leadsetTwo={data.leadsetTwo}
                                locationWiresOne={data.locationWiresOne}
                            />
                        )}
                    </div>
                    <div className="mt-4 flex justify-center-safe space-x-4">
                        <Button onClick={() => setEnter(true)} disabled={enter || data.leadsetNumber === ''}>
                            Подтвердить
                        </Button>
                        {enter && (
                            <Button variant={'outline'} disabled={!enter} onClick={resetForm}>
                                Сбросить
                            </Button>
                        )}
                    </div>
                    {enter &&
                        (wireCounter === 1 ? (
                            <OneWireForm
                                terminalOne={data.terminalOne}
                                terminalTwo={data.terminalTwo}
                                sealOne={data.sealOne}
                                sealTwo={data.sealTwo}
                                setData={heandleChange}
                                onSubmit={handleSubmit}
                                wire={data.wire}
                                wireName={data.wireName}
                                description={data.description}
                                customer={data.customer}
                                notes={data.notes}
                                errors={errors}
                                wireRequired={wireRequest[0]}
                            />
                        ) : wireCounter === 2 ? (
                            <TwoWireForm
                                terminalOne={data.terminalOne}
                                terminalTwo={data.terminalTwo}
                                terminalThree={data.terminalThree}
                                sealOne={data.sealOne}
                                sealThree={data.sealThree}
                                setData={heandleChange}
                                onSubmit={handleSubmit}
                                description={data.description}
                                customer={data.customer}
                                errors={errors}
                                locationWiresOne={data.locationWiresTwo}
                                leadsetOne={data.leadsetOne}
                                leadsetTwo={data.leadsetTwo}
                                notes={data.notes}
                            />
                        ) : (
                            <ThreeWireForm
                                leadsetOne={data.leadsetOne}
                                leadsetTwo={data.leadsetTwo}
                                leadsetThree={data.leadsetThree}
                                terminalOne={data.terminalOne}
                                terminalTwo={data.terminalTwo}
                                terminalThree={data.terminalThree}
                                terminalFour={data.terminalFour}
                                sealOne={data.sealOne}
                                sealFour={data.sealFour}
                                setData={heandleChange}
                                onSubmit={handleSubmit}
                                description={data.description}
                                customer={data.customer}
                                errors={errors}
                                locationWiresTwo={data.locationWiresTwo}
                                locationWiresOne={data.locationWiresOne}
                            />
                        ))}
                </div> */}
                <div>
                    <div className="mt-8">
                        <SelectFields
                            label="Выберите вид полуфабриката"
                            value={wireCounter.toString()}
                            onChange={(e) => {
                                setWireCounter(Number(e));
                                heandleChange('wireCount', e);
                            }}
                            options={viewLeadsetOptions}
                            className="w-full"
                            required={false}
                        />
                        <div className="mt-4">
                            <Button onClick={handleContinue}>Продолжить</Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
