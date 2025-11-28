import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import WireLayout from '@/layouts/wires-leyout';
import { update } from '@/routes/wires';
import { BreadcrumbItem, PropsResponse, Wire, WireColor, WireType } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import WireForm from './wire-form';

interface WireData {
    wire_code: string;
    cross_section: string;
    description: string;
    wire_type_id: string;
    base_color_id: string;
    stripe_color_id: string;
}

interface ServerErrors {
    wire_code?: string;
    wire_type_id?: string;
    cross_section?: string;
    description?: string;
    base_color_id?: string;
    stripe_color_id?: string;
    [key: string]: string | undefined;
}

type FormFieldsProps = 'wire_code' | 'wire_type_id' | 'cross_section' | 'description' | 'base_color_id' | 'stripe_color_id';
export default function WireUpdate({ wire, wire_types, wire_colors }: { wire: Wire; wire_types: PropsResponse<WireType>; wire_colors: WireColor[] }) {
    console.log(wire_types);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Провода',
            href: '/wires',
        },
        {
            title: `Редактирование провода ${wire.wire_code}`,
            href: `/wires/${wire.id}/edit`,
        },
    ];

    const [clientErrors, setClientErrors] = useState<ServerErrors>({});

    const { data, setData, put, processing, errors, reset, setError, submit } = useForm({
        wire_code: wire.wire_code,
        wire_type_id: wire.wire_type.id.toString(),
        cross_section: wire.cross_section.toString(),
        description: wire.description ? wire.description : '',
        base_color_id: wire.base_color.id.toString(),
        stripe_color_id: wire.stripe_color ? wire.stripe_color.id.toString() : '',
    });

    const handleInputChange = (field: FormFieldsProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(field, e.target.value);

        // Очищаем ошибку для этого поля при изменении
        if (clientErrors[field]) {
            setClientErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSelectChange = (field: FormFieldsProps) => (value: string) => {
        setData(field, value);

        // Очищаем ошибку для этого поля при изменении
        if (clientErrors[field]) {
            setClientErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    // Валидация сечения на клиенте
    const validateCrossSection = (value: string): string | null => {
        const trimmedValue = value.trim().replace(',', '.');

        if (!trimmedValue) {
            return 'Сечение обязательно для заполнения';
        }

        const numberValue = Number(trimmedValue);

        if (isNaN(numberValue)) {
            return 'Сечение должно быть числом';
        }

        if (numberValue <= 0) {
            return 'Сечение должно быть положительным числом';
        }

        return null;
    };

    // Общая валидация формы на клиенте
    const validateForm = (): boolean => {
        const errors: ServerErrors = {};

        // Валидация обязательных полей
        if (!data.wire_code.trim()) {
            errors.wire_code = 'Код провода обязателен для заполнения';
        }

        if (!data.wire_type_id) {
            errors.wire_type_id = 'Тип провода обязателен для выбора';
        }

        const crossSectionError = validateCrossSection(data.cross_section);
        if (crossSectionError) {
            errors.cross_section = crossSectionError;
        }

        if (!data.base_color_id) {
            errors.base_color_id = 'Основной цвет обязателен для выбора';
        }

        setClientErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const getErrorForField = (field: FormFieldsProps): string | undefined => {
        return clientErrors[field] || errors[field];
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Клиентская валидация
        if (!validateForm()) {
            toast.error('Проверьте правильность заполнения формы');
            return;
        }

        try {
            // Преобразование данных для отправки
            const transformData = {
                wire_code: data.wire_code.trim().toUpperCase(),
                wire_type_id: data.wire_type_id,
                cross_section: Number(data.cross_section.trim().replace(',', '.')),
                description: data.description.trim(),
                base_color_id: data.base_color_id,
                stripe_color_id: data.stripe_color_id || null,
            };

            // Отправка через router.post
            await submit(update(wire.id), {
                onSuccess: () => {
                    reset();
                },
                onError: (errors: ServerErrors) => {
                    // Ошибки с сервера автоматически попадут в пропсы
                    toast.error('Ошибка при создании провода');
                },
                preserveState: true,
                preserveScroll: true,
            });
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
            toast.error('Произошла непредвиденная ошибка');
        } finally {
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Редактирование провода ${wire.wire_code}`} />
            <WireLayout>
                <Heading title={'Редактирование провода ' + wire.wire_code} />
                <WireForm
                    wire_types={wire_types}
                    submit={handleSubmit}
                    processing={processing}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    data={data}
                    getErrorForField={getErrorForField}
                    wire_colors={wire_colors}
                    reset={reset}
                    setClientErrors={setClientErrors}
                    buttonName="Сохранить"
                />
            </WireLayout>
        </AppLayout>
    );
}
