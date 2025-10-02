import FormField from '@/components/form-field';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

import { Head, router, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

type FormFieldsProps = 'part_number' | 'supplier_part_number' | 'supplier_name' | 'description';

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

    const { data, setData, reset } = useForm({
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
                <form onSubmit={submit}>
                    <div className="flex gap-2">
                        <FormField
                            label="Код терминала (YPN)"
                            name="part_number"
                            value={data.part_number}
                            onChange={(e) => setData('part_number', e.target.value)}
                            id="part_number"
                            requiredIs
                            error={errors?.part_number}
                            className={errors?.part_number ? 'border-red-500' : ''}
                        />
                        <FormField
                            label="Код поставщика (SPN)"
                            name="supplier_part_number"
                            value={data.supplier_part_number}
                            onChange={(e) => setData('supplier_part_number', e.target.value)}
                            id="supplier_part_number"
                            requiredIs
                            error={errors?.supplier_part_number}
                            className={errors?.supplier_part_number ? 'border-red-500' : ''}
                        />
                        <FormField
                            label="Название поставщика"
                            name="supplier_name"
                            value={data.supplier_name}
                            onChange={(e) => setData('supplier_name', e.target.value)}
                            id="supplier_name"
                            requiredIs
                            error={errors?.supplier_name}
                            className={errors?.supplier_name ? 'border-red-500' : ''}
                        />
                    </div>
                    <div>
                        <FormField
                            label="Описание"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            id="description"
                            error={errors?.description}
                        />
                    </div>
                    <div className="mt-4 flex gap-2">
                        <Button type="submit" className="">
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />} Создать
                        </Button>
                        <Button type="button" variant="outline" className="">
                            Отменить
                        </Button>
                    </div>
                </form>
                <div className="mt-6 text-sm text-muted-foreground">
                    <span className="text-red-500">*</span> - Обязательные поля для заполнения
                </div>
            </div>
        </AppLayout>
    );
}
