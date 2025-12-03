import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { Wire } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';

export default function WireTable({ wires, deletedWire }: { wires: Wire[]; deletedWire: (id: number) => void }) {
    const { permissions } = useAuth();

    const column: ColumnDef<Wire>[] = [
        {
            accessorKey: 'wire_code',
            header: 'Код',
        },
        {
            accessorKey: 'description',
            header: 'Описание провода',
            cell: ({ row }) => {
                if (row.original.description) {
                    return row.original.description;
                } else {
                    return '-';
                }
            },
        },
        {
            accessorKey: 'wire_type',
            header: 'Тип',
            cell: ({ row }) => {
                return row.original.wire_type.type_name;
            },
        },
        {
            accessorKey: 'cross_section',
            header: 'Сечение',
        },
        {
            accessorKey: 'base_color',
            header: 'Основной цвет',
            cell: ({ row }) => {
                return row.original.base_color.color_name;
            },
        },
        {
            accessorKey: 'stripe_color',
            header: 'Дополнительный цвет',
            cell: ({ row }) => {
                if (row.original.stripe_color) {
                    return row.original.stripe_color.color_name;
                } else {
                    return '-';
                }
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
                            <EllipsisVertical />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        {permissions.includes('edit-wire') && (
                            <DropdownMenuItem asChild>
                                <Link href={`/wires/${row.original.id}/edit`}>Редактировать</Link>
                            </DropdownMenuItem>
                        )}
                        {/* <DropdownMenuItem>Копировать</DropdownMenuItem> */}

                        <DropdownMenuSeparator />

                        {permissions.includes('delete-wire') && (
                            <DropdownMenuItem variant="destructive" onClick={() => deletedWire(row.original.id)}>
                                Удалить
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    return <DataTable className="w-full" data={wires} columns={column} message="Создайте первый провод" />;
}
