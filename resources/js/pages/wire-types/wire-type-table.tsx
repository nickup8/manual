import { DataTable } from '@/components/data-table';
import { WireType } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export default function WireTypeTable({ className, data }: { data: WireType[]; className?: string }) {
    const columns: ColumnDef<WireType>[] = [
        {
            accessorKey: 'type_name',
            header: 'Тип провода',
        },
        {
            accessorKey: 'type_code',
            header: 'Код типа провода',
        },
    ];
    return <DataTable className={className} data={data} columns={columns} message="Создайте первый тип провода" />;
}
