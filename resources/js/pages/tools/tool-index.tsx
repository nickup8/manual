import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PropsResponse, Tool } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlusCircle, Search } from 'lucide-react';
import { useState } from 'react';
import ToolFilter from './tool-filter';
import ToolTable from './tool-table';

export default function ToolIndex({ tools }: { tools: PropsResponse<Tool> }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Аппликаторы',
            href: '/applicators',
        },
    ];

    const [open, setOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Аппликаторы" />
            <div className="flex flex-col space-y-6 px-4 py-6">
                <Heading title="Аппликаторы" />

                <div className="flex space-x-2">
                    <Button asChild>
                        <Link href="/applicators/create">
                            <PlusCircle className="h-4 w-4" />
                            Добавить аппликатор
                        </Link>
                    </Button>
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline">
                                <Search className="h-4 w-4" />
                                Поиск
                            </Button>
                        </SheetTrigger>
                        <ToolFilter />
                    </Sheet>
                </div>
                <ToolTable data={tools.data} />
                {tools.meta.last_page > 1 && (
                    <div className="mt-2 flex justify-center">
                        <Pagination links={tools.meta.links} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
