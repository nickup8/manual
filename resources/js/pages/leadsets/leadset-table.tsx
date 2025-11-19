import { DataTable } from '@/components/data-table';
import { Leadset } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export default function LeadsetTable({ data }: { data: Leadset[] }) {
    const columns: ColumnDef<Leadset>[] = [
        {
            accessorKey: 'leadsetNumber',
            header: 'Номер полуфабриката',
        },
        {
            accessorKey: 'description',
            header: 'Описание полуфабриката',
        },
        {
            accessorKey: 'status',
            header: 'Статус',
        },
        {
            accessorKey: 'customer',
            header: 'Заказчик',
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
