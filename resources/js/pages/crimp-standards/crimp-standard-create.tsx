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

type FormFieldsProps =
    | 'terminal'
    | 'seal'
    | 'primary_wire_type'
    | 'secondary_wire_type'
    | 'primary_wire_cross_section'
    | 'secondary_wire_cross_section'
    | 'strip_length'
    | 'conductor_crimp_height'
    | 'conductor_crimp_height_tolerance'
    | 'conductor_crimp_width_min'
    | 'conductor_crimp_width_max'
    | 'insulation_crimp_height'
    | 'insulation_crimp_height_tolerance'
    | 'insulation_crimp_width_min'
    | 'insulation_crimp_width_max'
    | 'primary_wire_separation_force'
    | 'secondary_wire_separation_force'
    | 'location_wires'
    | 'customer';

export default function CrimpStandardCreate({ wireTypes, success }: { wireTypes: PropsResponse<WireType>; success: string | null }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Параметры обжима',
            href: '/crimping',
        },
        {
            title: 'Создание параметров обжима',
            href: '/crimping/create',
        },
    ];
    const errors = usePage().props.errors;
    const [processing, setProccesing] = useState(false);

    const { data, setData, reset } = useForm({
        terminal: '',
        seal: '',
        primary_wire_type: '',
        secondary_wire_type: '',
        primary_wire_cross_section: '',
        secondary_wire_cross_section: '',
        strip_length: '',
        conductor_crimp_height: '',
        conductor_crimp_height_tolerance: '',
        conductor_crimp_width_min: '',
        conductor_crimp_width_max: '',
        insulation_crimp_height: '',
        insulation_crimp_height_tolerance: '',
        insulation_crimp_width_min: '',
        insulation_crimp_width_max: '',
        primary_wire_separation_force: '',
        secondary_wire_separation_force: '',
        location_wires: '',
        customer: '',
    });

    const wireTypesOption = wireTypes.data.map((item: WireType) => ({
        label: item.type_name,
        value: item.id.toString(),
    }));

    const locationWiresOption = [
        {
            label: 'Внакладку',
            value: 'inside',
        },
        {
            label: 'Рядом',
            value: 'near',
        },
    ];

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    const handleSelectChange = (field: FormFieldsProps) => (value: string) => {
        if (data[field] !== value) setData(field, value);
        else setData(field, '');
    };

    const onReset = () => {
        reset();
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProccesing(true);
        try {
            const preparedData: Partial<Record<FormFieldsProps, string | number>> = {
                terminal: data.terminal.trim(),
                seal: data.seal.trim(),
                primary_wire_type: Number(data.primary_wire_type.trim()),
                secondary_wire_type: Number(data.secondary_wire_type.trim()),
                primary_wire_cross_section: Number(data.primary_wire_cross_section.trim().replace(',', '.')),
                secondary_wire_cross_section: Number(data.secondary_wire_cross_section.trim().replace(',', '.')),
                strip_length: Number(data.strip_length.trim().replace(',', '.')),
                conductor_crimp_height: Number(data.conductor_crimp_height.trim().replace(',', '.')),
                conductor_crimp_height_tolerance: Number(data.conductor_crimp_height_tolerance.trim().replace(',', '.')),
                conductor_crimp_width_min: Number(data.conductor_crimp_width_min.trim().replace(',', '.')),
                conductor_crimp_width_max: Number(data.conductor_crimp_width_max.trim().replace(',', '.')),
                insulation_crimp_height: Number(data.insulation_crimp_height.trim().replace(',', '.')),
                insulation_crimp_height_tolerance: Number(data.insulation_crimp_height_tolerance.trim().replace(',', '.')),
                insulation_crimp_width_min: Number(data.insulation_crimp_width_min.trim().replace(',', '.')),
                insulation_crimp_width_max: Number(data.insulation_crimp_width_max.trim().replace(',', '.')),
                primary_wire_separation_force: Number(data.primary_wire_separation_force.trim().replace(',', '.')),
                secondary_wire_separation_force: Number(data.secondary_wire_separation_force.trim().replace(',', '.')),
                location_wires: data.location_wires.trim().toLowerCase(),
                customer: data.customer.trim().toUpperCase(),
            };
            await router.post('/crimping', preparedData, {
                onSuccess: () => {
                    setProccesing(false);
                    reset();
                },
                onError: () => setProccesing(false),
            });
        } catch (error) {
            setProccesing(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Создание параметров обжима" />
            <div className="space-y-6 px-4 py-6">
                <Heading title="Создание параметров обжима" />
                <form className="space-y-4" onSubmit={submit}>
                    <div className="flex space-x-2">
                        <FormField
                            label="Терминал"
                            name="terminal"
                            value={data.terminal}
                            onChange={(e) => setData('terminal', e.target.value)}
                            requiredIs
                            id="terminal"
                            error={errors.terminal}
                            className="w-full"
                        />
                        <FormField
                            label="Уплотнитель"
                            name="seal"
                            value={data.seal}
                            onChange={(e) => setData('seal', e.target.value)}
                            id="seal"
                            error={errors.seal}
                            className="w-full"
                        />
                    </div>
                    <div className="flex space-x-2">
                        <SelectFields
                            options={wireTypesOption}
                            label="Тип провода 1"
                            onChange={(e) => setData('primary_wire_type', e)}
                            value={data.primary_wire_type}
                            className="w-full"
                            required
                            error={errors.primary_wire_type}
                        />
                        <FormField
                            label="Сечение провода 1"
                            name="primary_wire_cross_section"
                            value={data.primary_wire_cross_section}
                            onChange={(e) => setData('primary_wire_cross_section', e.target.value)}
                            id="primary_wire_cross_section"
                            requiredIs
                            error={errors.primary_wire_cross_section}
                            className="w-full"
                        />
                        <SelectFields
                            options={wireTypesOption}
                            label="Тип провода 2"
                            onChange={(e) => setData('secondary_wire_type', e)}
                            value={data.secondary_wire_type}
                            className="w-full"
                            error={errors.secondary_wire_type}
                        />
                        <FormField
                            label="Сечение провода 2"
                            name="secondary_wire_cross_section"
                            value={data.secondary_wire_cross_section}
                            onChange={(e) => setData('secondary_wire_cross_section', e.target.value)}
                            id="secondary_wire_cross_section"
                            disabled={!data.secondary_wire_type}
                            error={errors.secondary_wire_cross_section}
                            className="w-full"
                        />
                        <SelectFields
                            options={locationWiresOption}
                            label="Расположение проводов"
                            onChange={(e) => setData('location_wires', e)}
                            value={data.location_wires}
                            className="w-full"
                            disabled={!data.secondary_wire_type}
                            error={errors.location_wires}
                        />
                    </div>
                    <div className="flex space-x-2">
                        <FormField
                            label="Длина зачистки"
                            name="strip_length"
                            value={data.strip_length}
                            onChange={(e) => setData('strip_length', e.target.value)}
                            id="strip_length"
                            requiredIs
                            error={errors.strip_length}
                            className="w-full"
                        />
                        <FormField
                            label="Высота обжима по жиле (мм)"
                            name="conductor_crimp_height"
                            value={data.conductor_crimp_height}
                            onChange={(e) => setData('conductor_crimp_height', e.target.value)}
                            id="conductor_crimp_height"
                            requiredIs
                            error={errors.conductor_crimp_height}
                            className="w-full"
                        />
                        <FormField
                            label="Допуск обжима по жиле (мм)"
                            name="conductor_crimp_height_tolerance"
                            value={data.conductor_crimp_height_tolerance}
                            onChange={(e) => setData('conductor_crimp_height_tolerance', e.target.value)}
                            id="conductor_crimp_height_tolerance"
                            requiredIs
                            error={errors.conductor_crimp_height_tolerance}
                            className="w-full"
                        />
                        <FormField
                            label="Высота обжима по изоляции (мм)"
                            name="insulation_crimp_height"
                            value={data.insulation_crimp_height}
                            onChange={(e) => setData('insulation_crimp_height', e.target.value)}
                            id="insulation_crimp_height"
                            requiredIs
                            error={errors.insulation_crimp_height}
                            className="w-full"
                        />
                        <FormField
                            label="Допуск обжима по изоляции (мм)"
                            name="insulation_crimp_height_tolerance"
                            value={data.insulation_crimp_height_tolerance}
                            onChange={(e) => setData('insulation_crimp_height_tolerance', e.target.value)}
                            id="insulation_crimp_height_tolerance"
                            requiredIs
                            error={errors.insulation_crimp_height_tolerance}
                            className="w-full"
                        />
                    </div>
                    <div className="flex space-x-2">
                        <FormField
                            label="Мин. ширина обжима по жиле (мм)"
                            name="conductor_crimp_width_min"
                            value={data.conductor_crimp_width_min}
                            onChange={(e) => setData('conductor_crimp_width_min', e.target.value)}
                            id="conductor_crimp_width_min"
                            requiredIs
                            error={errors.conductor_crimp_width_min}
                            className="w-full"
                        />
                        <FormField
                            label="Макс. ширина обжима по жиле (мм)"
                            name="conductor_crimp_width_max"
                            value={data.conductor_crimp_width_max}
                            onChange={(e) => setData('conductor_crimp_width_max', e.target.value)}
                            id="conductor_crimp_width_max"
                            requiredIs
                            error={errors.conductor_crimp_width_max}
                            className="w-full"
                        />
                        <FormField
                            label="Мин. ширина обжима по изоляции (мм)"
                            name="insulation_crimp_width_min"
                            value={data.insulation_crimp_width_min}
                            onChange={(e) => setData('insulation_crimp_width_min', e.target.value)}
                            id="insulation_crimp_width_min"
                            requiredIs
                            error={errors.insulation_crimp_width_min}
                            className="w-full"
                        />
                        <FormField
                            label="Макс. ширина обжима по изоляции (мм)"
                            name="insulation_crimp_width_max"
                            value={data.insulation_crimp_width_max}
                            onChange={(e) => setData('insulation_crimp_width_max', e.target.value)}
                            id="insulation_crimp_width_max"
                            requiredIs
                            error={errors.insulation_crimp_width_max}
                            className="w-full"
                        />
                    </div>
                    <div className="flex space-x-2">
                        <FormField
                            label="Усилие отрыва провода 1 (Н)"
                            name="primary_wire_separation_force"
                            value={data.primary_wire_separation_force}
                            onChange={(e) => setData('primary_wire_separation_force', e.target.value)}
                            id="primary_wire_separation_force"
                            requiredIs
                            error={errors.primary_wire_separation_force}
                            className="w-full"
                        />
                        <FormField
                            label="Усилие отрыва провода 2 (Н)"
                            name="secondary_wire_separation_force"
                            value={data.secondary_wire_separation_force}
                            onChange={(e) => setData('secondary_wire_separation_force', e.target.value)}
                            id="secondary_wire_separation_force"
                            disabled={!data.secondary_wire_type}
                            error={errors.secondary_wire_separation_force}
                            className="w-full"
                        />
                        <FormField
                            label="Заказчик"
                            name="customer"
                            value={data.customer}
                            onChange={(e) => setData('customer', e.target.value)}
                            id="customer"
                            requiredIs
                            error={errors.customer}
                            className="w-full"
                        />
                    </div>
                    <div className="flex space-x-2">
                        <Button type="submit">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Сохранить
                        </Button>
                        <Button type="reset" variant={'outline'} onClick={onReset}>
                            Сбросить
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
