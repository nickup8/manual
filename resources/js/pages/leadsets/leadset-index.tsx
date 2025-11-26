import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/use-auth';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Leadset, PropsResponse } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlusCircle, Search } from 'lucide-react';
import { useState } from 'react';
import LeadsetTable from './leadset-table';

export default function LeadsetIndex({ leadsets }: { leadsets: PropsResponse<Leadset> }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Полуфабрикаты',
            href: '/leadsets',
        },
    ];

    const [open, setOpen] = useState(false);
    const { permissions } = useAuth();

    console.log(permissions);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Полуфабрикаты" />
            <div className="flex flex-col space-y-6 px-4 py-6">
                <Heading title="Полуфабрикаты" />
                <div className="flex items-center gap-2">
                    {permissions.includes('create-leadset') && (
                        <Button asChild>
                            <Link href="/leadsets/create">
                                <PlusCircle className="h-4 w-4" />
                                Добавить полуфабрикат
                            </Link>
                        </Button>
                    )}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline">
                                <Search className="h-4 w-4" />
                                Поиск
                            </Button>
                        </SheetTrigger>
                        {/* <SealFilter colors={seal_colors.data} setOpen={setOpen} /> */}
                    </Sheet>
                </div>
                <LeadsetTable data={leadsets.data} />
            </div>
        </AppLayout>
    );
}
