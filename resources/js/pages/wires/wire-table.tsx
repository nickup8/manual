import { DataTable } from '@/components/data-table';
import { Wire } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export default function WireTable() {
    const column: ColumnDef<Wire>[] = [
        {
            accessorKey: 'wire_code',
            header: 'Код',
        },
        {
            accessorKey: 'wire_name',
            header: 'Название провода',
        },
        {
            accessorKey: 'wire_type_id',
            header: 'Тип',
        },
        {
            accessorKey: 'cross_section',
            header: 'Сечение',
        },
        {
            accessorKey: 'base_color_id',
            header: 'Основной цвет',
        },
        {
            accessorKey: 'stripe_color_id',
            header: 'Дополнительный цвет',
        },
    ];

    return <DataTable className="w-full" data={[]} columns={column} message="Создайте первый провод" />;
}
