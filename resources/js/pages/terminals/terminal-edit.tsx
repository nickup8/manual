import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { update } from '@/routes/terminals';
import { Terminal } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import TerminalForm from './terminal-form';
interface TerminalData {
    part_number: string;
    supplier_part_number: string;
    supplier_name: string;
    description: string;
}
export default function TerminalEdit({ terminal }: { terminal: Terminal }) {
    const breadcrumbs = [
        {
            title: 'Терминалы',
            href: '/terminals',
        },
        {
            title: `Редактирование терминала ${terminal.part_number}`,
            href: `/terminals/${terminal.id}/edit`,
        },
    ];

    const { data, setData, errors, processing, submit, setError } = useForm<TerminalData>({
        part_number: terminal.part_number ? terminal.part_number : '',
        supplier_part_number: terminal.supplier_part_number ? terminal.supplier_part_number : '',
        supplier_name: terminal.supplier_name ? terminal.supplier_name : '',
        description: terminal.description ? terminal.description : '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await submit(update(terminal.id));
        } catch (error) {
            toast.error('При редактировании терминала произошла ошибка. Проверьте введенные данные и попробуйте снова.');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Редактирование терминала ${terminal.part_number}`} />
            <div className="px-4 py-6">
                <Heading title={`Редактирование терминала ${terminal.part_number}`} />
                <TerminalForm data={data} errors={errors} processing={processing} setData={setData} submit={handleSubmit} buttonText="Сохранить" />
            </div>
        </AppLayout>
    );
}
