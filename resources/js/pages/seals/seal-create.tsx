import FormField from '@/components/form-field';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PropsResponse, SealColor } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

type FormFieldsProps = 'part_number' | 'supplier_part_number' | 'supplier_name' | 'description' | 'color';
export default function SealCreate({ seal_colors, success }: { seal_colors: PropsResponse<SealColor>; success: string | null }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Уплотнители',
            href: '/seals',
        },
        {
            title: 'Создание уплотнителя',
            href: '/seals/create',
        },
    ];

    const [processing, setProcessing] = useState(false);

    const { data, setData, reset } = useForm({
        part_number: '',
        supplier_part_number: '',
        supplier_name: '',
        description: '',
        color: '',
    });

    const errors = usePage().props.errors;

    const handleSelectChange = (field: FormFieldsProps) => (value: string) => {
        setData(field, value);
    };
    const handleReset = () => {
        reset();
    };

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        try {
            const preparedData: Partial<Record<FormFieldsProps, string>> = {
                part_number: data.part_number,
                supplier_part_number: data.supplier_part_number.toUpperCase(),
                supplier_name: data.supplier_name.toUpperCase(),
                description: data.description,
                color: data.color,
            };
            await router.post('/seals', preparedData, {
                onSuccess: () => {
                    reset();
                    setProcessing(false);
                },
                onError: () => {
                    setProcessing(false);
                    toast.error('При создании уплотнителя произошла ошибка. Проверьте введенные данные и попробуйте снова.');
                },
            });
        } catch (error) {
            setProcessing(false);
            toast.error('При создании уплотнителя произошла ошибка. Проверьте введенные данные и попробуйте снова.');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Создание уплотнителя" />
            <div className="px-4 py-6">
                <Heading title="Создание уплотнителя" description="Добавление нового уплотнителя" />
                <form className="space-y-2" onSubmit={submit}>
                    <div className="flex space-x-2">
                        <FormField
                            label="Код уплотнителя"
                            name="part_number"
                            value={data.part_number}
                            onChange={(e) => setData('part_number', e.target.value)}
                            requiredIs
                            error={errors.part_number}
                            placeholder="Код уплотнителя"
                            id="part_number"
                            className="w-full"
                        />
                        <FormField
                            label="Код поставщика"
                            name="supplier_part_number"
                            value={data.supplier_part_number}
                            onChange={(e) => setData('supplier_part_number', e.target.value)}
                            requiredIs
                            error={errors.supplier_part_number}
                            placeholder="Код поставщика"
                            id="supplier_part_number"
                            className="w-full"
                        />
                        <FormField
                            label="Название поставщика"
                            name="supplier_name"
                            value={data.supplier_name}
                            onChange={(e) => setData('supplier_name', e.target.value)}
                            requiredIs
                            error={errors.supplier_name}
                            placeholder="Название поставщика"
                            id="supplier_name"
                            className="w-full"
                        />
                    </div>
                    <div className="flex space-x-2">
                        <div className="w-full">
                            <Label>
                                Цвет <span className="text-red-500">*</span>
                            </Label>
                            <div className="mt-1">
                                <Select value={data.color} onValueChange={handleSelectChange('color')}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Выберите цвет" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {seal_colors.data.map((color: SealColor) => (
                                            <SelectItem key={color.id} value={color.id.toString()}>
                                                <span
                                                    className="mr-2 inline-block h-3 w-3 rounded-full"
                                                    style={{ backgroundColor: color.color_code }}
                                                />
                                                <span>{color.color_name}</span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.color && <InputError message={errors.color} />}
                            </div>
                        </div>
                        <FormField
                            label="Описание"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            error={errors.description}
                            placeholder="Описание"
                            id="description"
                            className="w-full"
                        />
                    </div>

                    <div className="flex space-x-2 pt-2">
                        <Button type="submit" className="" disabled={processing}>
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />} Создать
                        </Button>
                        <Button variant="outline" onClick={handleReset}>
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
