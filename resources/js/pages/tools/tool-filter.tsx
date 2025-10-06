import FormField from '@/components/form-field';
import { Button } from '@/components/ui/button';
import { SheetContent, SheetFooter, SheetHeader } from '@/components/ui/sheet';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ToolFilter() {
    const [processing, setProcessing] = useState(false);
    const { data, setData, reset } = useForm({
        inventory_number: '',
        terminal: '',
        seal: '',
        customer: '',
    });

    return (
        <SheetContent>
            <SheetHeader>Поиск аппликатора</SheetHeader>
            <form className="space-y-4 px-4">
                <FormField
                    name="inventory_number"
                    label="Инвентарный номер"
                    onChange={(e) => setData('inventory_number', e.target.value)}
                    value={data.inventory_number}
                    id="inventory_number"
                />
                <FormField
                    name="terminal"
                    label="Терминал"
                    onChange={(e) => setData('terminal', e.target.value)}
                    value={data.terminal}
                    id="terminal"
                />
                <FormField name="seal" label="Уплотнитель" onChange={(e) => setData('seal', e.target.value)} value={data.seal} id="seal" />
                <FormField
                    name="customer"
                    label="Заказчик"
                    onChange={(e) => setData('customer', e.target.value)}
                    value={data.customer}
                    id="customer"
                />
            </form>
            <SheetFooter>
                <Button>Найти</Button>
                <Button type="button" variant="outline">
                    Очитистить
                </Button>
            </SheetFooter>
        </SheetContent>
    );
}
