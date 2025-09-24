import FormField from '@/components/form-field';
import Heading from '@/components/heading';
import SelectFields from '@/components/select-fields';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import WireLayout from '@/layouts/wires-leyout';
import { BreadcrumbItem, PropsResponse, SelectOption, WireColor, WireType } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type FormFieldsProps = 'wire_code' | 'wire_type_id' | 'cross_section' | 'description' | 'base_color_id' | 'stripe_color_id';

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

export default function WireCreate({
    wire_types,
    wire_colors,
    success,
    errors: serverErrors = {}, // Ошибки с сервера из пропсов
}: {
    wire_types: PropsResponse<WireType>;
    wire_colors: WireColor[];
    success: string | null;
    errors?: ServerErrors; // Ошибки валидации с сервера
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Провода',
            href: '/wires',
        },
        {
            title: 'Добавить провод',
            href: '/wires/create',
        },
    ];

    const { data, setData, reset } = useForm<WireData>({
        wire_code: '',
        wire_type_id: '',
        cross_section: '',
        description: '',
        base_color_id: '',
        stripe_color_id: '',
    });

    const [processing, setProcessing] = useState(false);
    const [clientErrors, setClientErrors] = useState<ServerErrors>({});

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    // Очищаем ошибки при изменении данных
    useEffect(() => {
        setClientErrors({});
    }, [data]);

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

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        // Клиентская валидация
        if (!validateForm()) {
            setProcessing(false);
            toast.error('Проверьте правильность заполнения формы');
            return;
        }

        try {
            // Преобразование данных для отправки
            const transformData = {
                wire_code: data.wire_code.trim(),
                wire_type_id: data.wire_type_id,
                cross_section: Number(data.cross_section.trim().replace(',', '.')),
                description: data.description.trim(),
                base_color_id: data.base_color_id,
                stripe_color_id: data.stripe_color_id || null,
            };

            // Отправка через router.post
            await router.post('/wires', transformData, {
                onSuccess: () => {
                    reset();
                    toast.success('Провод успешно создан!');
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
            setProcessing(false);
        }
    };

    // Объединяем ошибки: сначала клиентские, потом серверные
    const getErrorForField = (field: FormFieldsProps): string | undefined => {
        return clientErrors[field] || serverErrors[field];
    };

    const wire_types_options: SelectOption[] = wire_types.data.map((wire_type: WireType) => ({
        value: wire_type.id.toString(),
        label: wire_type.type_name,
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Добавить провод" />
            <WireLayout>
                <div className="space-y-4">
                    <Heading title="Добавить провод" description="Введите данные о проводе" />
                    <form className="space-y-2" onSubmit={submit}>
                        <div className="flex space-x-2">
                            <FormField
                                label="Код провода (YPN)"
                                name="wire_code"
                                id="wire_code"
                                value={data.wire_code}
                                onChange={handleInputChange('wire_code')}
                                error={getErrorForField('wire_code')}
                                requiredIs
                                className={getErrorForField('wire_code') ? 'border-red-500' : ''}
                            />
                            <div className="w-full">
                                <SelectFields
                                    className={getErrorForField('base_color_id') ? 'border-red-500' : ''}
                                    label="Тип провода"
                                    message="Выберите тип провода"
                                    options={wire_types_options}
                                    onChange={handleSelectChange('wire_type_id')}
                                    value={data.wire_type_id}
                                    required
                                    error={getErrorForField('wire_type_id')}
                                />
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <FormField
                                label="Сечение"
                                name="cross_section"
                                id="cross_section"
                                value={data.cross_section}
                                onChange={handleInputChange('cross_section')}
                                requiredIs
                                error={getErrorForField('cross_section')}
                                placeholder="Например: 1.5 или 2,5"
                                className={getErrorForField('cross_section') ? 'border-red-500' : ''}
                            />
                            <FormField
                                label="Описание"
                                name="description"
                                id="description"
                                value={data.description}
                                onChange={handleInputChange('description')}
                                error={getErrorForField('description')}
                                placeholder="Необязательное описание"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-full">
                                <Label className="required">
                                    Основной цвет <span className="text-red-500">*</span>
                                </Label>
                                <div className="mt-1">
                                    <Select value={data.base_color_id} onValueChange={handleSelectChange('base_color_id')}>
                                        <SelectTrigger className={getErrorForField('base_color_id') ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Выберите основной цвет" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {wire_colors.map((wire_color: WireColor) => (
                                                <SelectItem key={wire_color.id} value={wire_color.id.toString()}>
                                                    <span
                                                        className="mr-2 inline-block h-3 w-3 rounded-full border border-gray-300"
                                                        style={{ backgroundColor: wire_color.color_code }}
                                                    />
                                                    <span>{wire_color.color_name}</span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {getErrorForField('base_color_id') && (
                                        <p className="mt-1 text-sm text-red-500">{getErrorForField('base_color_id')}</p>
                                    )}
                                </div>
                            </div>
                            <div className="w-full">
                                <Label className="">Дополнительный цвет</Label>
                                <div className="mt-1">
                                    <Select value={data.stripe_color_id} onValueChange={handleSelectChange('stripe_color_id')}>
                                        <SelectTrigger className={getErrorForField('stripe_color_id') ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Выберите дополнительный цвет" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {wire_colors.map((wire_color: WireColor) => (
                                                <SelectItem key={wire_color.id} value={wire_color.id.toString()}>
                                                    <span
                                                        className="mr-2 inline-block h-3 w-3 rounded-full border border-gray-300"
                                                        style={{ backgroundColor: wire_color.color_code }}
                                                    />
                                                    <span>{wire_color.color_name}</span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {getErrorForField('stripe_color_id') && (
                                        <p className="mt-1 text-sm text-red-500">{getErrorForField('stripe_color_id')}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <Button type="submit" disabled={processing}>
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Добавить провод
                            </Button>
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => {
                                    reset();
                                    setClientErrors({});
                                }}
                                disabled={processing}
                            >
                                Очистить
                            </Button>
                        </div>
                    </form>
                    <div className="mt-6 text-sm text-muted-foreground">
                        <span className="text-red-500">*</span> - Обязательные поля для заполнения
                    </div>
                </div>
            </WireLayout>
        </AppLayout>
    );
}
