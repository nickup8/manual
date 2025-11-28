import FormField from '@/components/form-field';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';

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
export default function TerminalForm({
    data,
    setData,
    errors,
    submit,
    processing = false,
    buttonText = 'Создать',
    edit,
}: {
    data: TerminalData;
    setData: (key: string, value: string) => void;
    errors: ServerError;
    submit: (e: React.FormEvent<HTMLFormElement>) => void;
    processing?: boolean;
    buttonText?: string;
    edit?: boolean;
}) {
    return (
        <>
            <form onSubmit={submit}>
                <div className="flex gap-2">
                    <div className="w-full">
                        <FormField
                            label="Код терминала (YPN)"
                            name="part_number"
                            value={data.part_number}
                            onChange={(e) => setData('part_number', e.target.value)}
                            id="part_number"
                            requiredIs
                            error={errors?.part_number}
                            className={errors?.part_number ? 'border-red-500' : ''}
                            disabled={edit}
                        />
                    </div>
                    <div className="w-full">
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
                    </div>
                    <div className="w-full">
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
                </div>
                <div className="w-full">
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
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />} {buttonText}
                    </Button>
                </div>
            </form>
            <div className="mt-6 text-sm text-muted-foreground">
                <span className="text-red-500">*</span> - Обязательные поля для заполнения
            </div>
        </>
    );
}
