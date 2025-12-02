import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { Terminal } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';

export default function TerminalTable({ data, deletedTerminal }: { data: Terminal[]; deletedTerminal: (id: number) => void }) {
    const { permissions } = useAuth();
    const { submit } = useForm();
    const columns: ColumnDef<Terminal>[] = [
        {
            accessorKey: 'part_number',
            header: 'Код терминала (YPN)',
        },
        {
            accessorKey: 'supplier_part_number',
            header: 'Код поставщика (SPN)',
        },
        {
            accessorKey: 'supplier_name',
            header: 'Поставщик',
        },
        {
            accessorKey: 'description',
            header: 'Описание',
        },
        {
            accessorKey: 'created_at',
            header: 'Дата создания',
            cell: ({ row }) =>
                new Date(row.original.created_at).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }),
        },
        {
            accessorKey: 'updated_at',
            header: 'Дата обновления',
            cell: ({ row }) =>
                new Date(row.original.updated_at).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }),
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
                        {permissions.includes('edit-terminal') && (
                            <DropdownMenuItem asChild>
                                <Link href={`/terminals/${row.original.id}/edit`}>Редактировать</Link>
                            </DropdownMenuItem>
                        )}
                        {/* <DropdownMenuItem>Копировать</DropdownMenuItem> */}

                        {permissions.includes('delete-terminal') && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem variant="destructive" onClick={() => deletedTerminal(row.original.id)}>
                                    Удалить
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    return <DataTable data={data} columns={columns} message="Создайте первый терминал" />;
}
