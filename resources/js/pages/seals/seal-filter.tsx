import FormField from '@/components/form-field';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { SealColor } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

type FormFieldsProps = 'part_number' | 'supplier_part_number' | 'supplier_name' | 'color';

export default function SealFilter({ colors, setOpen }: { colors: SealColor[]; setOpen: (open: boolean) => void }) {
    const [processing, setProcessing] = useState(false);

    const { data, setData, reset } = useForm({
        part_number: '',
        supplier_part_number: '',
        supplier_name: '',
        color: '',
    });

    const handleInputChange = (field: FormFieldsProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(field, e.target.value);
    };

    // Функция для обработки изменений select
    const handleSelectChange = (field: FormFieldsProps) => (value: string) => {
        setData(field, value);
    };
    const handleReset = () => {
        reset();
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const preparedData: Partial<Record<FormFieldsProps, string>> = {};

            Object.entries(data).forEach(([key, value]) => {
                const fieldKey = key as FormFieldsProps; // ⚠️ Приводим к типу

                if (value !== '' && value !== null && value !== undefined) {
                    preparedData[fieldKey] = value as string;
                }
            });
            await router.get('/seals', preparedData, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setOpen(false);
                    setProcessing(false);
                },
                onError: () => {
                    setProcessing(false);
                },
            });
        } catch (error) {
            setProcessing(false);
        }
    };

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Поиск уплотнителя</SheetTitle>
                <SheetDescription>Введите параметры для поиска терминалов.</SheetDescription>
            </SheetHeader>
            <form className="flex w-full flex-col space-y-2 px-4" onSubmit={submit}>
                {/* Input поле */}
                <FormField
                    label="Код уплотнителя (YPN)"
                    id="part_number"
                    name="part_number"
                    onChange={handleInputChange('part_number')}
                    value={data.part_number}
                />
                {/* Input поле */}
                <FormField
                    label="Код поставщика (SPN)"
                    id="supplier_part_number"
                    name="supplier_part_number"
                    onChange={handleInputChange('supplier_part_number')}
                    value={data.supplier_part_number}
                />
                {/* Input поле */}
                <FormField
                    label="Поставщик"
                    id="supplier_name"
                    name="supplier_name"
                    onChange={handleInputChange('supplier_name')}
                    value={data.supplier_name}
                />
                <div>
                    <Label>Цвет</Label>
                    <Select value={data.color} onValueChange={handleSelectChange('color')}>
                        <SelectTrigger>
                            <SelectValue placeholder="Основной цвет" />
                        </SelectTrigger>
                        <SelectContent>
                            {colors.map((color: SealColor) => (
                                <SelectItem key={color.id} value={color.id.toString()}>
                                    <span className="mr-2 inline-block h-3 w-3 rounded-full" style={{ backgroundColor: color.color_code }} />
                                    <span>{color.color_name}</span>
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
