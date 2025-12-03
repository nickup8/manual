import { ActiveFilters } from '@/components/active-filters';
import HeadingSmall from '@/components/heading-small';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/use-auth';
import AppLayout from '@/layouts/app-layout';
import WireLayout from '@/layouts/wires-leyout';
import { getWireActiveFilters } from '@/lib/utils';
import { destroy } from '@/routes/wires';
import { BreadcrumbItem, PropsResponse, Wire, WireColor, WireFilterParams, WireType } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Dialog } from '@radix-ui/react-dialog';
import { Loader2, PlusCircle, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import WireFilter from './wire-filter';
import WireTable from './wire-table';

export default function WireIndex({
    wire_types,
    wire_colors,
    wires,
    queryParams,
    filter,
    success,
}: {
    wire_types: WireType[];
    wire_colors: WireColor[];
    wires: PropsResponse<Wire>;
    queryParams?: Record<string, string>;
    filter: WireFilterParams;
    success?: string | null;
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

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [deleteWire, setDeleteWire] = useState<Wire | undefined>();

    const { permissions } = useAuth();

    const { submit, processing } = useForm();

    const deletedWire = (id: number) => {
        setDeleteWire(wires.data.find((wire) => wire.id === id));
        setOpenModal(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await submit(destroy(id), {
                onSuccess: () => {
                    setOpenModal(false);
                },
                onError: () => {
                    toast.error('При удалении провода произошла ошибка. Проверьте введенные данные и попробуйте снова.');
                    setOpenModal(false);
                },
            });
        } catch (error) {
            toast.error('При удалении провода произошла ошибка. Проверьте введенные данные и попробуйте снова.');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Провода" />
            <WireLayout>
                <div className="space-y-4">
                    <HeadingSmall title="Провода" description="Создавайте, удаляйте и редактируйте провода для полуфабрикатов" />
                    <div className="flex flex-col space-y-6">
                        <div className="w-full space-x-4">
                            {permissions.includes('create-wire') && (
                                <Button asChild>
                                    <Link href="/wires/create">
                                        <PlusCircle className="h-4 w-4" />
                                        Добавить провод
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
                        <WireTable wires={wires.data} deletedWire={deletedWire} />
                        {wires.meta.last_page > 1 && (
                            <div className="mt-2 flex justify-center">
                                <Pagination links={wires.meta.links} />
                            </div>
                        )}
                    </div>
                </div>

                <Dialog
                    open={openModal}
                    onOpenChange={(isOpen) => {
                        if (!processing) {
                            setOpenModal(isOpen);
                        }
                    }}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Подтверждение удаления</DialogTitle>
                            <DialogDescription>
                                Вы уверены, что хотите удалить провод <span className="font-bold text-red-500">{deleteWire?.wire_code}</span>?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="destructive" onClick={() => handleDelete(deleteWire!.id)} disabled={processing}>
                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Удалить
                            </Button>
                            <Button variant="outline" onClick={() => setOpenModal(false)}>
                                Отменить
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </WireLayout>
        </AppLayout>
    );
}
