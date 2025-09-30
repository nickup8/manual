import { DataTable } from '@/components/data-table';
import { Terminal } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export default function TerminalTable({ data }: { data: Terminal[] }) {
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
    ];

    return <DataTable data={data} columns={columns} message="Создайте первый терминал" />;
}
