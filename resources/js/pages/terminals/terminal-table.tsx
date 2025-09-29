import { DataTable } from '@/components/data-table';
import { Terminal } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export default function TerminalTable({ data }: { data: Terminal[] }) {
    const columns: ColumnDef<Terminal>[] = [
        {
            accessorKey: 'part_number',
            header: 'Код терминала (YPN)',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{row.getValue('part_number')}</span>
                </div>
            ),
        },
        {
            accessorKey: 'supplier_part_number',
            header: 'Код поставщика (SPN)',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{row.getValue('supplier_part_number')}</span>
                </div>
            ),
        },
        {
            accessorKey: 'supplier_name',
            header: 'Поставщик',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{row.getValue('supplier_name')}</span>
                </div>
            ),
        },
        {
            accessorKey: 'description',
            header: 'Описание',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{row.getValue('description')}</span>
                </div>
            ),
        },
        {
            accessorKey: 'created_at',
            header: 'Дата создания',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{row.getValue('created_at')}</span>
                </div>
            ),
        },
        {
            accessorKey: 'updated_at',
            header: 'Дата обновления',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{row.getValue('updated_at')}</span>
                </div>
            ),
        },
    ];

    return <DataTable data={data} columns={columns} message="Создайте первый терминал" />;
}
