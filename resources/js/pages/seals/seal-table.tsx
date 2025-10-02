import { DataTable } from '@/components/data-table';
import { Seal } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export default function SealTable({ data }: { data: Seal[] }) {
    const columns: ColumnDef<Seal>[] = [
        {
            accessorKey: 'part_number',
            header: 'Код уплотнителя (YPN)',
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
            accessorKey: 'color',
            header: 'Цвет',
            cell: ({ row }) => {
                return row.original.color.color_name;
            },
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
    return <DataTable message="Создайте первый уплотнитель" data={data} columns={columns} />;
}
