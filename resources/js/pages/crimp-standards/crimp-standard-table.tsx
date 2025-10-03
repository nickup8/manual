import { DataTable } from '@/components/data-table';
import { LOCATION_WIRES } from '@/lib/constants';
import { CrimpStandard } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export default function CrimpStandardTable({ data }: { data: CrimpStandard[] }) {
    const columns: ColumnDef<CrimpStandard>[] = [
        {
            accessorKey: 'terminal',
            header: 'Терминал',
            cell: ({ row }) => {
                return row.original.terminal.part_number;
            },
        },
        {
            accessorKey: 'seal',
            header: 'Уплотнитель',
            cell: ({ row }) => {
                if (row.original.seal) {
                    return row.original.seal.part_number;
                } else {
                    return '-';
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
            accessorKey: 'primary_wire_cross_section',
            header: 'Сечение провода 1',
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
            accessorKey: 'secondary_wire_cross_section',
            header: 'Сечение провода 2',
            cell: ({ row }) => {
                return row.original.secondary_wire_cross_section ? row.original.secondary_wire_cross_section : '-';
            },
        },
        {
            accessorKey: 'location_wires',
            header: 'Расположение проводов',
            cell: ({ row }) => {
                return row.original.location_wires ? LOCATION_WIRES[row.original.location_wires] : '-';
            },
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
                } else {
                    return '-';
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
                } else {
                    return '-';
                }
            },
        },
    ];

    return <DataTable message="Нет данных" data={data} columns={columns} />;
}
