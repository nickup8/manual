import FormField from '@/components/form-field';
import Heading from '@/components/heading';
import SelectFields from '@/components/select-fields';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PropsResponse, WireType } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ToolCreate({ wireTypes, success }: { wireTypes: PropsResponse<WireType>; success: string | null }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Аппликаторы',
            href: '/applicators',
        },
        {
            title: 'Создание аппликатора',
            href: '/applicators/create',
        },
    ];

    const [processing, setProcessing] = useState(false);

    const wireTypesOptions = wireTypes.data.map((wireType) => ({
        value: wireType.id.toString(),
        label: wireType.type_name,
    }));

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    const { data, setData, reset } = useForm({
        inventory_number: '',
        terminal: '',
        seal: '',
        primary_wire_type: '',
        secondary_wire_type: '',
        location: '',
        customer: '',
    });

    const errors = usePage().props.errors;

    const submit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setProcessing(true);
            const preparedData = {
                inventory_number: data.inventory_number.trim().toUpperCase(),
                terminal: data.terminal.trim().toUpperCase(),
                seal: data.seal.trim().toUpperCase(),
                primary_wire_type: Number(data.primary_wire_type.trim()),
                secondary_wire_type: Number(data.secondary_wire_type.trim()),
                location: data.location.trim().toUpperCase(),
                customer: data.customer.trim().toUpperCase(),
            };
            await router.post('/applicators', preparedData, {
                onSuccess: () => {
                    setProcessing(false);
                    reset();
                },
                onError: () => {
                    (setProcessing(false), toast.error('При создании аппликатора произошла ошибка. Проверьте введенные данные и попробуйте снова.'));
                },
            });
        } catch (error) {
            setProcessing(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Создание аппликатора" />
            <div className="px-4 py-6">
                <Heading title="Создание аппликатора" />
                <form className="flex flex-col space-y-4" onSubmit={submit}>
                    <div>
                        <FormField
                            label="Инвентарный номер"
                            name="inventory_number"
                            requiredIs
                            id="inventory_number"
                            value={data.inventory_number}
                            onChange={(e) => setData('inventory_number', e.target.value)}
                            error={errors.inventory_number}
                        />
                    </div>
                    <div className="flex space-x-2">
                        <FormField
                            label="Терминал"
                            name="terminal"
                            requiredIs
                            id="terminal"
                            value={data.terminal}
                            onChange={(e) => setData('terminal', e.target.value)}
                            error={errors.terminal}
                        />
                        <FormField label="Уплотнитель" name="seal" id="seal" value={data.seal} onChange={(e) => setData('seal', e.target.value)} />
                    </div>
                    <div className="flex space-x-2">
                        <SelectFields
                            label="Провод 1"
                            value={data.primary_wire_type}
                            onChange={(e) => setData('primary_wire_type', e)}
                            options={wireTypesOptions}
                            className="w-full"
                            required
                            error={errors.primary_wire_type}
                        />
                        <SelectFields
                            label="Провод 2"
                            value={data.secondary_wire_type}
                            onChange={(e) => setData('secondary_wire_type', e)}
                            options={wireTypesOptions}
                            className="w-full"
                            error={errors.secondary_wire_type}
                        />
                        <FormField
                            label="Место хранения"
                            name="location"
                            id="location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            requiredIs
                            error={errors.location}
                        />
                        <FormField
                            label="Заказчик"
                            name="customer"
                            id="customer"
                            value={data.customer}
                            onChange={(e) => setData('customer', e.target.value)}
                            requiredIs
                            error={errors.customer}
                        />
                    </div>
                    <div className="flex space-x-2">
                        <Button type="submit">
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Сохранить
                        </Button>
                        <Button onClick={() => reset()} variant={'outline'}>
                            Очистить
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
