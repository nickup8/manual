import FormField from '@/components/form-field';
import { Button } from '@/components/ui/button';
import { SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type FormFieldsProps = 'terminal' | 'seal';
export default function CrimpStandardFilter({ setOpen }: { setOpen: (open: boolean) => void }) {
    const [proccessing, setProcessing] = useState(false);

    const { data, setData } = useForm({
        terminal: '',
        seal: '',
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
            await router.get('/crimping', preparedData, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setOpen(false);
                    setProcessing(false);
                },
                onError: () => {
                    setProcessing(false);
                    toast.error('Ошибка при поиске', { description: 'Проверьте введенные данные и попробуйте снова' });
                },
            });
        } catch (error) {
            setProcessing(false);
            toast.error('Ошибка при поиске', { description: 'Проверьте введенные данные и попробуйте снова' });
        }
    };

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Поиск параметров</SheetTitle>
            </SheetHeader>
            <form className="flex w-full flex-col space-y-2 px-4" onSubmit={submit}>
                <FormField
                    label="Терминал"
                    name="terminal"
                    value={data.terminal}
                    onChange={(e) => setData('terminal', e.target.value)}
                    id="terminal"
                />
                <FormField label="Уплотнитель" name="seal" value={data.seal} onChange={(e) => setData('seal', e.target.value)} id="seal" />
            </form>
            <SheetFooter>
                <Button onClick={submit}>
                    {proccessing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                    Найти
                </Button>
                <Button variant="outline" onClick={() => setOpen(false)}>
                    Отменить
                </Button>
            </SheetFooter>
        </SheetContent>
    );
}
