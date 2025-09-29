import { DataTable } from '@/components/data-table';
import { Wire } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export default function WireTable({ wires }: { wires: Wire[] }) {
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
    ];

    return <DataTable className="w-full" data={wires} columns={column} message="Создайте первый провод" />;
}
