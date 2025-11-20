import FormField from '@/components/form-field';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import WireLayout from '@/layouts/wires-leyout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function WireTypeCreate({ success }: { success: string | null }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Провода',
            href: '/wires',
        },
        {
            title: 'Типы проводов',
            href: '/wire-types',
        },
        {
            title: 'Создание типа провода',
            href: '/wire-types/create',
        },
    ];

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    const [processing, setProcessing] = useState(false);

    const { data, setData, reset } = useForm({
        type_name: '',
        type_code: '',
    });

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setProcessing(true);
        const transformData = {
            ...data,
            type_name: data.type_name.trim().toUpperCase(),
            type_code: data.type_code.trim().toUpperCase(),
        };

        router.post('/wire-types', transformData, {
            onSuccess: () => {
                reset();
                setProcessing(false);
            },
            onError: () => {
                (setProcessing(false), toast.error('При создании типа провода произошла ошибка. Проверьте введенные данные и попробуйте снова.'));
            },
        });
    }

    const onReset = () => {
        reset();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Создание типа провода" />
            <WireLayout>
                <div className="space-y-4">
                    <HeadingSmall title="Создание типа провода" description="Введите данные в форму ниже" />
                    <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
                        <div className="flex w-full space-x-2">
                            <FormField
                                label="Название типа провода"
                                id="type_name"
                                name="type_name"
                                onChange={(e) => setData('type_name', e.target.value)}
                                value={data.type_name}
                                className="w-full"
                                requiredIs
                            />
                            <FormField
                                label="Код типа провода"
                                id="type_code"
                                name="type_code"
                                onChange={(e) => setData('type_code', e.target.value)}
                                value={data.type_code}
                                className="w-full"
                                requiredIs
                            />
                        </div>
                        <div className="flex space-x-2">
                            <Button type="submit" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Создать
                            </Button>
                            <Button type="reset" variant={'secondary'} onClick={onReset}>
                                Сбросить
                            </Button>
                        </div>
                    </form>
                </div>
            </WireLayout>
        </AppLayout>
    );
}
