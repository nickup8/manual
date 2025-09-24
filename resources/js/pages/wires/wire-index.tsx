import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import AppLayout from '@/layouts/app-layout';
import WireLayout from '@/layouts/wires-leyout';
import { BreadcrumbItem, WireColor, WireType } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlusCircle, Search } from 'lucide-react';
import { useState } from 'react';
import WireFilter from './wire-filter';
import WireTable from './wire-table';

export default function WireIndex({ wire_types, wire_colors }: { wire_types: WireType[]; wire_colors: WireColor[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Провода',
            href: '/wires',
        },
    ];

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
                                <WireFilter wire_types={wire_types} wire_colors={wire_colors} setOpen={setOpen} />
                            </Sheet>
                        </div>
                        <WireTable />

                        {/* <div>
                            <WireFilter wire_types={wire_types} wire_colors={wire_colors} />
                        </div> */}
                    </div>
                </div>
            </WireLayout>
        </AppLayout>
    );
}
