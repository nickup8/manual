import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import TerminalForm from './terminal-form';

type FormFieldsProps = 'part_number' | 'supplier_part_number' | 'supplier_name' | 'description';

interface TerminalData {
    part_number: string;
    supplier_part_number: string;
    supplier_name: string;
    description: string;
}

type ServerError = {
    [key in FormFieldsProps]?: string;
};

export default function TerminalCreate({ success, error }: { success: string | null; error: ServerError }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Терминалы',
            href: '/terminals',
        },
        {
            title: 'Создание терминала',
            href: '/terminals/create',
        },
    ];
    const [processing, setProcessing] = useState(false);

    const { data, setData, reset } = useForm<TerminalData>({
        part_number: '',
        supplier_part_number: '',
        supplier_name: '',
        description: '',
    });

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    // const getErrorForField = (field: FormFieldsProps): string | undefined => {
    //     return clientErrors[field] || serverErrors[field];
    // };
    const errors = usePage().props.errors;
    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        try {
            const preparedData: Partial<Record<FormFieldsProps, string>> = {
                part_number: data.part_number,
                supplier_part_number: data.supplier_part_number,
                supplier_name: data.supplier_name,
                description: data.description,
            };
            await router.post('/terminals', preparedData, {
                onSuccess: () => {
                    reset();
                    setProcessing(false);
                },
                onError: () => {
                    setProcessing(false);
                    toast.error('При создании терминала произошла ошибка. Проверьте введенные данные и попробуйте снова.');
                },
            });
        } catch (error) {
            setProcessing(false);
            toast.error('При создании терминала произошла ошибка. Проверьте введенные данные и попробуйте снова.');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Создание терминала" />
            <div className="px-4 py-6">
                <Heading title="Создание терминала" description="Создайте новый терминал." />
                <TerminalForm data={data} setData={setData} errors={errors} submit={submit} processing={processing} />
            </div>
        </AppLayout>
    );
}
