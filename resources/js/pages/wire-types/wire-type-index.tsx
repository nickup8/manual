import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import WireLayout from '@/layouts/wires-leyout';
import { BreadcrumbItem, PropsResponse, WireType } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import WireTypeTable from './wire-type-table';

export default function WireTypeIndex({ wireTypes }: { wireTypes: PropsResponse<WireType> }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Провода',
            href: '/wires',
        },
        {
            title: 'Типы проводов',
            href: '/wire-types',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Типы проводов" />
            <WireLayout>
                <div className="space-y-4">
                    <HeadingSmall title="Типы проводов" description="Управление типами проводов" />
                    <Button asChild>
                        <Link href="/wire-types/create">
                            <PlusCircle className="h-4 w-4" /> Добавить тип провода
                        </Link>
                    </Button>
                    <WireTypeTable className="max-w-2xl" data={wireTypes.data} />
                </div>
            </WireLayout>
        </AppLayout>
    );
}
