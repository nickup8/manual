import { ActiveFilters } from '@/components/active-filters';
import HeadingSmall from '@/components/heading-small';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import AppLayout from '@/layouts/app-layout';
import WireLayout from '@/layouts/wires-leyout';
import { getWireActiveFilters } from '@/lib/utils';
import { BreadcrumbItem, PropsResponse, Wire, WireColor, WireFilterParams, WireType } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlusCircle, Search } from 'lucide-react';
import { useState } from 'react';
import WireFilter from './wire-filter';
import WireTable from './wire-table';

export default function WireIndex({
    wire_types,
    wire_colors,
    wires,
    queryParams,
    filter,
}: {
    wire_types: WireType[];
    wire_colors: WireColor[];
    wires: PropsResponse<Wire>;
    queryParams?: Record<string, string>;
    filter: WireFilterParams;
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Провода',
            href: '/wires',
        },
    ];

    const activeFilters = getWireActiveFilters(
        filter,
        {
            wire_code: 'Код провода',
            wire_type_id: 'Тип провода',
            cross_section: 'Сечение',
            base_color_id: 'Основной цвет',
            stripe_color_id: 'Дополнительный',
        },
        wire_types,
        wire_colors,
    );

    const [open, setOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Провода" />
            <WireLayout>
                <div className="space-y-4">
                    <HeadingSmall title="Провода" description="Создавайте, удаляйте и редактируйте провода для полуфабрикатов" />
                    <div className="flex flex-col space-y-6">
                        <div className="w-full space-x-4">
                            <Button asChild>
                                <Link href="/wires/create">
                                    <PlusCircle className="h-4 w-4" />
                                    Добавить провод
                                </Link>
                            </Button>
                            <Sheet open={open} onOpenChange={setOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="cursor-pointer">
                                        <Search className="h-4 w-4" />
                                        Поиск
                                    </Button>
                                </SheetTrigger>
                                <WireFilter
                                    key={Object.values(filter || {})
                                        .filter(Boolean)
                                        .join('-')}
                                    wire_types={wire_types}
                                    wire_colors={wire_colors}
                                    setOpen={setOpen}
                                    queryParams={filter}
                                />
                            </Sheet>
                        </div>
                        {activeFilters.length > 0 && <ActiveFilters filters={activeFilters} />}
                        <WireTable wires={wires.data} />
                        {wires.meta.last_page > 1 && (
                            <div className="mt-2 flex justify-center">
                                <Pagination links={wires.meta.links} />
                            </div>
                        )}
                    </div>
                </div>
            </WireLayout>
        </AppLayout>
    );
}
