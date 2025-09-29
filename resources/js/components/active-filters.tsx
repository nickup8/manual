// components/active-filters.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { X } from 'lucide-react';

interface ActiveFiltersProps {
    key: string;
    value: string | number;
    label: string;
}

export function ActiveFilters({ filters }: { filters: ActiveFiltersProps[] }) {
    const removeFilter = (filterKey: string) => {
        // Получаем текущие query параметры из URL
        const urlParams = new URLSearchParams(window.location.search);

        // Удаляем конкретный фильтр
        urlParams.delete(filterKey);

        // Формируем новый URL
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;

        // Переходим по новому URL (Inertia way)
        router.visit(newUrl, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearAllFilters = () => {
        // Просто переходим на страницу без query параметров
        router.visit(window.location.pathname, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    if (filters.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center gap-2 rounded-lg bg-muted/50 p-4">
            <span className="text-sm font-medium">Активные фильтры:</span>
            {filters.map((filter) => (
                <Badge key={filter.key} variant="secondary" className="flex items-center gap-1">
                    <span>
                        {filter.label}: {filter.value}
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 cursor-pointer p-0 transition hover:bg-transparent hover:text-destructive"
                        onClick={() => removeFilter(filter.key)}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </Badge>
            ))}
            <Button variant="outline" size="sm" className="cursor-pointer" onClick={clearAllFilters}>
                Очистить все
            </Button>
        </div>
    );
}
