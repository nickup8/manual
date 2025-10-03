import { ActiveFilters } from '@/components/active-filters';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import AppLayout from '@/layouts/app-layout';
import { getActiveFiltersSimple } from '@/lib/utils';
import { BreadcrumbItem, CrimpStandard, PropsResponse } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlusCircle, Search } from 'lucide-react';
import { useState } from 'react';
import CrimpStandardFilter from './crimp-standard-filter';
import CrimpStandardTable from './crimp-standard-table';

export default function CrimpStandardIndex({ crimpStandards, filter }: { crimpStandards: PropsResponse<CrimpStandard>; filter: CrimpStandard }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Параметры обжима',
            href: '/crimping',
        },
    ];

    const [open, setOpen] = useState(false);

    const activeFilter = getActiveFiltersSimple(filter, {
        terminal: 'Терминал',
        seal: 'Уплотнитель',
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Параметры обжима" />
            <div className="space-y-6 px-4 py-6">
                <Heading title="Параметры обжима" />
                <div className="flex space-x-2">
                    <Button asChild>
                        <Link href="/crimping/create">
                            <PlusCircle className="h-4 w-4" />
                            Добавить параметры
                        </Link>
                    </Button>
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline">
                                <Search className="h-4 w-4" />
                                Поиск
                            </Button>
                        </SheetTrigger>
                        <CrimpStandardFilter setOpen={setOpen} />
                    </Sheet>
                </div>
                {activeFilter.length > 0 && <ActiveFilters filters={activeFilter} />}

                <CrimpStandardTable data={crimpStandards.data} />
            </div>
        </AppLayout>
    );
}
