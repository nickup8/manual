import FormField from '@/components/form-field';
import { Button } from '@/components/ui/button';
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

type FormFieldsProps = 'part_number' | 'supplier_purt_number' | 'supplier_name' | 'description';
export default function TerminalFilter({
    queryParams,
    setOpen,
}: {
    queryParams: Partial<Record<FormFieldsProps, string>>;
    setOpen: (open: boolean) => void;
}) {
    // state
    const [processing, setProcessing] = useState(false);

    // useForm
    const { data, setData, reset } = useForm({
        part_number: queryParams?.part_number || '',
        supplier_purt_number: queryParams?.supplier_purt_number || '',
        supplier_name: queryParams?.supplier_name || '',
        description: queryParams?.description || '',
    });

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
            await router.get('/terminals', preparedData, {
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

    const handleInputChange = (field: FormFieldsProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(field, e.target.value);
    };

    const handleReset = () => {
        reset();
    };
    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Поиск терминалов</SheetTitle>
                <SheetDescription>Введите параметры для поиска терминалов.</SheetDescription>
            </SheetHeader>
            <form className="flex w-full flex-col space-y-2 px-4" onSubmit={submit}>
                {/* Input поле */}
                <FormField
                    label="Код терминала (YPN)"
                    id="part_number"
                    name="part_number"
                    onChange={handleInputChange('part_number')}
                    value={data.part_number}
                />
                {/* Input поле */}
                <FormField
                    label="Код поставщика (SPN)"
                    id="supplier_purt_number"
                    name="supplier_purt_number"
                    onChange={handleInputChange('supplier_purt_number')}
                    value={data.supplier_purt_number}
                />
                {/* Input поле */}
                <FormField
                    label="Поставщик"
                    id="supplier_name"
                    name="supplier_name"
                    onChange={handleInputChange('supplier_name')}
                    value={data.supplier_name}
                />
                <FormField
                    label="Описание"
                    id="description"
                    name="description"
                    onChange={handleInputChange('description')}
                    value={data.description}
                />
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
