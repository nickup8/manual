import FormField from '@/components/form-field';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PropsResponse, Seal, Wire } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import OneWireForm from './wire-leadset/one-wire-form';
import OneWireLeadset from './wire-leadset/one-wire-leadset';

export default function LeadsetCreateOne({ wires, seals, success }: { wires: PropsResponse<Wire>; success: string; seals: PropsResponse<Seal> }) {
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
            title: 'Создание одиночного полуфабриката',
            href: '/leadsets/create/leadset-create-one',
        },
    ];

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    const { data, setData, reset } = useForm({
        leadsetNumber: '',
        wireCount: 1,
        wire: '',
        wireName: '',
        leadset: '',
        terminalOne: '',
        terminalTwo: '',
        sealOne: '',
        sealTwo: '',
        notes: '',
        description: '',
        customer: '',
        stripeLengthOne: '',
        stripeLengthTwo: '',
    });

    const errors = usePage().props.errors as any;

    const wireRequest = wires.data.filter((wireReq: Wire) => wireReq.wire_code.toLowerCase() === data.wire.toLowerCase());

    const sealFilter = (sealNumber: string) => {
        return seals.data.filter((seal: Seal) => seal.part_number === sealNumber);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(
            '/leadsets/create/leadset-create-one',
            {
                ...data,
                stripeLengthOne: Number(data.stripeLengthOne.trim().replace(',', '.')),
                stripeLengthTwo: Number(data.stripeLengthTwo.trim().replace(',', '.')),
                customer: data.customer.toUpperCase(),
                wire: data.wire.toUpperCase(),
                wireCount: Number(data.wireCount),
                leadsetNumber: data.leadsetNumber.toUpperCase(),
            },
            {
                onSuccess: () => {
                    reset();
                },
                onError: (errors) => {
                    //;
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Создание одиночного полуфабриката" />
            <div className="px-4 py-6">
                <Heading title="Создание одиночного полуфабриката" />
                <div className="mt-4 mb-8">
                    <FormField
                        label="Номер полуфабриката (S - номер)"
                        value={data.leadsetNumber}
                        onChange={(e) => setData('leadsetNumber', e.target.value)}
                        error={errors.leadsetNumber}
                        className="w-full"
                        requiredIs
                        id="leadsetNumber"
                        name="leadsetNumber"
                    />
                </div>
                <div className="flex justify-center">
                    <OneWireLeadset
                        wire={data.wire}
                        wireName={data.wireName}
                        terminalOne={data.terminalOne}
                        terminalTwo={data.terminalTwo}
                        sealOne={sealFilter(data.sealOne)[0]}
                        sealTwo={sealFilter(data.sealTwo)[0]}
                        wireRequired={wireRequest[0]}
                        stripeLengthOne={data.stripeLengthOne}
                        stripeLengthTwo={data.stripeLengthTwo}
                    />
                </div>
                <div className="mt-4">
                    <OneWireForm
                        wire={data.wire}
                        setData={setData}
                        wireName={data.wireName}
                        customer={data.customer}
                        notes={data.notes}
                        description={data.description}
                        terminalOne={data.terminalOne}
                        terminalTwo={data.terminalTwo}
                        sealOne={data.sealOne}
                        sealTwo={data.sealTwo}
                        errors={errors}
                        onSubmit={submit}
                        stripeLengthOne={data.stripeLengthOne}
                        stripeLengthTwo={data.stripeLengthTwo}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
