import { ActiveFilters } from '@/components/active-filters';
import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/use-auth';
import AppLayout from '@/layouts/app-layout';
import { getActiveFiltersSimple } from '@/lib/utils';
import { BreadcrumbItem, PropsResponse, Terminal } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlusCircle, Search, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import TerminalFilter from './terminal-filter';
import TerminalTable from './terminal-table';

export default function TerminalIndex({ terminals, filter, success }: { terminals: PropsResponse<Terminal>; filter: Terminal; success: string }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Терминалы',
            href: '/terminals',
        },
    ];

    // state

    const [open, setOpen] = useState(false);

    const activeFilter = getActiveFiltersSimple(filter, {
        part_number: 'Код терминала (YPN)',
        supplier_part_number: 'Код поставщика (SPN)',
        supplier_name: 'Поставщик',
        description: 'Описание',
    });

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    const { permissions } = useAuth();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Терминалы" />

            <div className="flex flex-col space-y-6 px-4 py-6">
                <Heading title="Терминалы" description="Управляйте номенклатурой терминалов." />
                <div className="flex items-center gap-2">
                    {permissions.includes('create-terminal') && (
                        <Button asChild>
                            <Link href="/terminals/create">
                                <PlusCircle className="h-4 w-4" />
                                Добавить терминал
                            </Link>
                        </Button>
                    )}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="cursor-pointer">
                                <Search className="h-4 w-4" />
                                Поиск
                            </Button>
                        </SheetTrigger>
                        <TerminalFilter setOpen={setOpen} queryParams={filter} />
                    </Sheet>
                    <Button variant="outline" className="cursor-pointer">
                        <div className="relative">
                            <div className="flex items-center">
                                <Upload className="mr-2 h-4 w-4 cursor-pointer" />
                                Импорт
                            </div>
                            <Input type="file" className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0 file:cursor-pointer" />
                        </div>
                    </Button>
                </div>
                {activeFilter.length > 0 && <ActiveFilters filters={activeFilter} />}
                <TerminalTable data={terminals.data} />
                {terminals.meta.last_page > 1 && (
                    <div className="mt-2 flex justify-center">
                        <Pagination links={terminals.meta.links} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
