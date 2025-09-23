import FormField from '@/components/form-field';
import SelectFields from '@/components/select-fields';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { WireColor, WireType } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

type FormFieldsProps = 'wire_code' | 'wire_type_id' | 'cross_section' | 'description' | 'base_color_id' | 'stripe_color_id';

export default function WireFilter({
    wire_types,
    wire_colors,
    queryParams = {},
    setOpen,
}: {
    wire_types: WireType[];
    wire_colors: any;
    setOpen: (open: boolean) => void;
    queryParams?: Record<string, string>;
}) {
    const { data, setData, reset } = useForm({
        wire_code: queryParams.wire_code || '',
        wire_type_id: queryParams.wire_type_id || '',
        cross_section: queryParams.cross_section || '',
        description: queryParams.description || '',
        base_color_id: queryParams.base_color_id || '',
        stripe_color_id: queryParams.stripe_color_id || '',
    });

    const wire_types_options = wire_types.map((wire_type) => ({
        value: wire_type.id.toString(),
        label: wire_type.type_name,
    }));

    const [processing, setProcessing] = useState(false);

    // ✅ ПРАВИЛЬНАЯ функция submit
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        // Фильтруем пустые значения
        const filteredData = Object.fromEntries(Object.entries(data).filter(([, value]) => value !== '' && value !== null));

        // Объединяем с существующими параметрами
        const params = { ...queryParams, ...filteredData };

        router.get('/wires', params, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                setProcessing(false);
            },
        });
    };

    // Функция для обработки изменений input
    const handleInputChange = (field: FormFieldsProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(field, e.target.value);
    };

    // Функция для обработки изменений select
    const handleSelectChange = (field: FormFieldsProps) => (value: string) => {
        setData(field, value);
    };

    // ✅ Функция для сброса с очисткой queryParams
    const handleReset = () => {
        reset();
    };

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Поиск провода</SheetTitle>
                <SheetDescription>Введите параметры для поиска провода.</SheetDescription>
            </SheetHeader>
            <form className="flex w-full flex-col space-y-2 px-4" onSubmit={submit}>
                {/* Input поле */}
                <FormField label="Код провода" id="wire_code" name="wire_code" onChange={handleInputChange('wire_code')} value={data.wire_code} />
                {/* Select поле */}
                <SelectFields
                    options={wire_types_options}
                    onChange={handleSelectChange('wire_type_id')}
                    label="Тип провода"
                    message="Выберите тип провода"
                    value={data.wire_type_id}
                />
                {/* Input поле */}
                <FormField
                    label="Сечение"
                    id="cross_section"
                    name="cross_section"
                    onChange={handleInputChange('cross_section')}
                    value={data.cross_section}
                />
                {/* Input поле */}
                <FormField
                    label="Описание"
                    id="description"
                    name="description"
                    onChange={handleInputChange('description')}
                    value={data.description}
                />
                {/* Select поле для основного цвета */}
                <div>
                    <Label>Основной цвет</Label>
                    <Select value={data.base_color_id} onValueChange={handleSelectChange('base_color_id')}>
                        <SelectTrigger>
                            <SelectValue placeholder="Основной цвет" />
                        </SelectTrigger>
                        <SelectContent>
                            {wire_colors.map((wire_color: WireColor) => (
                                <SelectItem key={wire_color.id} value={wire_color.id.toString()}>
                                    <span className="mr-2 inline-block h-3 w-3 rounded-full" style={{ backgroundColor: wire_color.color_code }} />
                                    <span>{wire_color.color_name}</span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {/* Select поле для дополнительного цвета */}
                <div>
                    <Label>Дополнительный цвет</Label>
                    <Select value={data.stripe_color_id} onValueChange={handleSelectChange('stripe_color_id')}>
                        <SelectTrigger>
                            <SelectValue placeholder="Дополнительный цвет" />
                        </SelectTrigger>
                        <SelectContent>
                            {wire_colors.map((wire_color: WireColor) => (
                                <SelectItem key={wire_color.id} value={wire_color.id.toString()}>
                                    <span className="mr-2 inline-block h-3 w-3 rounded-full" style={{ backgroundColor: wire_color.color_code }} />
                                    <span>{wire_color.color_name}</span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </form>

            <SheetFooter>
                <Button onClick={submit} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Найти
                </Button>
                <Button type="button" variant="outline" onClick={handleReset}>
                    Сбросить
                </Button>
            </SheetFooter>
        </SheetContent>
    );
}
