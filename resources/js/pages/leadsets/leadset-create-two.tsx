import FormField from '@/components/form-field';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Leadset, PropsResponse } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import TwoWireForm from './wire-leadset/two-wire-form';
import TwoWireLeadSet from './wire-leadset/two-wire-leadset';

export default function LeadsetCreateTwo({ leadsets }: { leadsets: PropsResponse<Leadset> }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Полуфабрикаты',
            href: '/leadsets',
        },
        {
            title: 'Добавить полуфабрикат',
            href: '/leadsets/create',
        },
        {
            title: 'Создание марьяжного полуфабриката',
            href: '/leadsets/create/leadset-create-two',
        },
    ];

    const { data, setData, reset } = useForm({
        wireCount: 2,
        leadsetNumber: '',
        leadsetOne: '',
        leadsetTwo: '',
        terminalOne: '',
        terminalTwo: '',
        terminalThree: '',
        sealOne: '',
        sealThree: '',
        locationWiresOne: '',
        customer: '',
        notes: '',
        description: '',
    });

    const errors = usePage().props.errors;
    const leadsetsRq = (leadsetStr: string) => leadsets.data.filter((leadset: Leadset) => leadset.leadsetNumber === leadsetStr)[0];

    const [disabledTerminalOne, setDisabledTerminalOne] = useState<boolean>(false);
    const [disabledTerminalThree, setDisabledTerminalThree] = useState<boolean>(false);
    const [customErrors, setCustomErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (data.leadsetOne) {
            const selectedLeadset = leadsetsRq(data.leadsetOne);
            if (selectedLeadset) {
                if (selectedLeadset.terminals?.length > 1) {
                    toast.error('Выбранный полуфабрикат имеет два терминала. Пожалуйста, выберите другое полуфабрикат.');
                    setCustomErrors((prev) => ({
                        ...prev,
                        leadsetOne: 'Выбранный полуфабрикат имеет два терминала. Пожалуйста, выберите другое полуфабрикат.',
                    }));
                } else {
                    setData('terminalOne', selectedLeadset.terminals?.[0]?.terminal?.part_number || '');
                    setData('sealOne', selectedLeadset.seals?.[0]?.part_number || '');
                    setDisabledTerminalOne(true);
                    setCustomErrors((prev) => ({
                        ...prev,
                        leadsetOne: '',
                    }));
                }
                // Пример: обновляем поля на основе данных из найденного leadset
                // Замените на нужные поля, которые вы хотите присвоить

                // и т.д.
            }
        }
    }, [data.leadsetOne, setData, leadsets.data]);

    // useEffect для обновления полей при изменении leadsetTwo
    useEffect(() => {
        if (data.leadsetTwo) {
            const selectedLeadset = leadsetsRq(data.leadsetTwo);
            if (selectedLeadset) {
                if (selectedLeadset.terminals?.length > 1) {
                    toast.error('Выбранный полуфабрикат имеет два терминала. Пожалуйста, выберите другое полуфабрикат.');
                    setCustomErrors((prev) => ({
                        ...prev,
                        leadsetTwo: 'Выбранный полуфабрикат имеет два терминала. Пожалуйста, выберите другое полуфабрикат.',
                    }));
                } else {
                    setData('terminalThree', selectedLeadset.terminals?.[0]?.terminal?.part_number || '');
                    setDisabledTerminalThree(true);
                    setCustomErrors((prev) => ({
                        ...prev,
                        leadsetTwo: '',
                    }));
                }
            }
        }
    }, [data.leadsetTwo, setData, leadsets.data]);

    const allErrors = { ...errors, ...customErrors };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(
            '/leadsets/create/leadset-create-two',
            { ...data },
            {
                onSuccess: () => {
                    (reset(), toast.success('Leadset успешно создан'));
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Создание марьяжного полуфабриката" />
            <div className="px-4 py-6">
                <Heading title="Создание марьяжного полуфабриката" />
                <div className="mt-4 mb-8">
                    <FormField
                        label="Номер полуфабриката (S - номер)"
                        value={data.leadsetNumber}
                        onChange={(e) => setData('leadsetNumber', e.target.value)}
                        error={allErrors.leadsetNumber}
                        className="w-full"
                        requiredIs
                        id="leadsetNumber"
                        name="leadsetNumber"
                    />
                </div>
                <div className="flex justify-center">
                    <TwoWireLeadSet
                        leadsetOne={leadsetsRq(data.leadsetOne)}
                        leadsetTwo={leadsetsRq(data.leadsetTwo)}
                        terminalOne={data.terminalOne}
                        terminalTwo={data.terminalTwo}
                        terminalThree={data.terminalThree}
                        sealOne={data.sealOne}
                        sealThree={data.sealThree}
                        locationWiresOne={data.locationWiresOne}
                        leadsets={leadsets.data}
                    />
                </div>
                <div className="mt-4">
                    <TwoWireForm
                        customer={data.customer}
                        leadsetOne={data.leadsetOne}
                        leadsetTwo={data.leadsetTwo}
                        notes={data.notes}
                        terminalOne={data.terminalOne}
                        terminalTwo={data.terminalTwo}
                        terminalThree={data.terminalThree}
                        sealOne={data.sealOne}
                        sealThree={data.sealThree}
                        locationWiresOne={data.locationWiresOne}
                        description={data.description}
                        errors={allErrors}
                        setData={setData}
                        onSubmit={submit}
                        disabledTerminalOne={disabledTerminalOne}
                        disabledTerminalThree={disabledTerminalThree}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
