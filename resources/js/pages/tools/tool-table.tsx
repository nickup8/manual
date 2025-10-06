import { DataTable } from '@/components/data-table';
import { Tool } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export default function ToolTable({ data }: { data: Tool[] }) {
    const columns: ColumnDef<Tool>[] = [
        {
            accessorKey: 'inventory_number',
            header: 'Инвентарный номер',
        },
        {
            accessorKey: 'terminal',
            header: 'Терминал',
            cell: ({ row }) => {
                if (row.original.terminal) {
                    return row.original.terminal.part_number;
                } else {
                    return '-';
                }
            },
        },
        {
            accessorKey: 'seal',
            header: 'Уплотнитель',
            cell: ({ row }) => {
                if (row.original.seal) {
                    return row.original.seal.part_number;
                } else if (row.original.any_seal) {
                    return '*';
                } else if (!row.original.seal && !row.original.any_seal) {
                    return '';
                }
            },
        },
        {
            accessorKey: 'primary_wire_type',
            header: 'Тип провода 1',
            cell: ({ row }) => {
                if (row.original.primary_wire_type) {
                    return row.original.primary_wire_type.type_name;
                } else {
                    return '-';
                }
            },
        },
        {
            accessorKey: 'secondary_wire_type',
            header: 'Тип провода 2',
            cell: ({ row }) => {
                if (row.original.secondary_wire_type) {
                    return row.original.secondary_wire_type.type_name;
                } else {
                    return '-';
                }
            },
        },
        {
            accessorKey: 'location',
            header: 'Расположение',
        },
        {
            accessorKey: 'customer',
            header: 'Заказчик',
        },
        {
            accessorKey: 'created_at',
            header: 'Дата создания',
            cell: ({ row }) => {
                if (row.original.created_at) {
                    return new Date(row.original.created_at).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                    });
                }
            },
        },
        {
            accessorKey: 'updated_at',
            header: 'Дата обновления',
            cell: ({ row }) => {
                if (row.original.updated_at) {
                    return new Date(row.original.updated_at).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                    });
                }
            },
        },
    ];
    return <DataTable message="Нет данных для отображения" data={data} columns={columns} />;
}
