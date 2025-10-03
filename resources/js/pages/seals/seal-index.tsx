import { ActiveFilters } from '@/components/active-filters';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import AppLayout from '@/layouts/app-layout';
import { getSealActiveFilters } from '@/lib/utils';
import { BreadcrumbItem, PropsResponse, Seal, SealColor } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlusCircle, Search } from 'lucide-react';
import { useState } from 'react';
import SealFilter from './seal-filter';
import SealTable from './seal-table';

export default function SealIndex({
    seal_colors,
    seals,
    filter,
}: {
    seal_colors: PropsResponse<SealColor>;
    seals: PropsResponse<Seal>;
    filter: Seal;
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Уплотнители',
            href: '/seals',
        },
    ];

    const [open, setOpen] = useState(false);

    const activeFilters = getSealActiveFilters(
        filter,
        {
            part_number: 'Код уплотнителя (YPN)',
            supplier_part_number: 'Код поставщика (SPN)',
            supplier_name: 'Поставщик',
            description: 'Описание',
            color: 'Цвет',
        },
        seal_colors.data,
    );
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Уплотнители" />
            <div className="flex flex-col space-y-6 px-4 py-6">
                <Heading title="Уплотнители" description="Управление уплотнителями" />
                <div className="flex items-center gap-2">
                    <Button asChild>
                        <Link href="/seals/create">
                            <PlusCircle className="h-4 w-4" />
                            Добавить уплотнитель
                        </Link>
                    </Button>
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline">
                                <Search className="h-4 w-4" />
                                Поиск
                            </Button>
                        </SheetTrigger>
                        <SealFilter colors={seal_colors.data} setOpen={setOpen} />
                    </Sheet>
                </div>
                {activeFilters.length > 0 && <ActiveFilters filters={activeFilters} />}
                <SealTable data={seals.data} />
            </div>
        </AppLayout>
    );
}
