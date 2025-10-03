import { SealColor, WireColor, WireType } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// utils/simple-filter-utils.ts
export function getActiveFiltersSimple(filter: Record<string, any>, labels: Record<string, string>) {
    return Object.entries(filter)
        .filter(([_, value]) => value && value !== '')
        .map(([key, value]) => ({
            key,
            value,
            label: labels[key] || key,
        }));
}

export function getWireActiveFilters(filter: Record<string, any>, labels: Record<string, string>, wire_types: WireType[], wire_colors: WireColor[]) {
    const activeFilters = [];

    if (filter.wire_code) {
        activeFilters.push({
            key: 'wire_code',
            label: 'Код провода (YPN)',
            value: filter.wire_code,
        });
    }

    if (filter.wire_type_id) {
        const wireType = wire_types.find((type) => type.id === Number(filter.wire_type_id));
        activeFilters.push({
            key: 'wire_type_id',
            label: 'Тип провода',
            value: wireType?.type_name,
        });
    }
    if (filter.cross_section) {
        activeFilters.push({
            key: 'cross_section',
            label: 'Сечение',
            value: filter.cross_section.toString(),
        });
    }

    if (filter.base_color_id) {
        const baseColor = wire_colors.find((color) => color.id === Number(filter.base_color_id));
        activeFilters.push({
            key: 'base_color_id',
            label: 'Основной цвет',
            value: baseColor?.color_name || `ID: ${filter.base_color_id}`,
        });
    }

    if (filter.stripe_color_id) {
        const stripeColor = wire_colors.find((color) => color.id === Number(filter.stripe_color_id));
        activeFilters.push({
            key: 'stripe_color_id',
            label: 'Дополнительный цвет',
            value: stripeColor?.color_name || `ID: ${filter.stripe_color_id}`,
        });
    }

    return activeFilters;
}

export function getSealActiveFilters(filter: Record<string, any>, labels: Record<string, string>, seal_colors: SealColor[]) {
    const activeFilters = [];
    if (filter.part_number) {
        activeFilters.push({
            key: 'part_number',
            label: 'Уплотнитель (YPN)',
            value: filter.part_number,
        });
    }
    if (filter.supplier_part_number) {
        activeFilters.push({
            key: 'supplier_part_number',
            label: 'Код поставщика (SPN)',
            value: filter.supplier_part_number,
        });
    }
    if (filter.supplier_name) {
        activeFilters.push({
            key: 'supplier_name',
            label: 'Поставщик',
            value: filter.supplier_name,
        });
    }
    if (filter.color) {
        const sealColor = seal_colors.find((color) => color.id === Number(filter.color));
        activeFilters.push({
            key: 'color',
            label: 'Цвет',
            value: sealColor?.color_name || `ID: ${filter.color}`,
        });
    }

    return activeFilters;
}

export const validateCrossSection = (value: string): string | null => {
    const trimmedValue = value.trim().replace(',', '.');

    if (!trimmedValue) {
        return 'Сечение обязательно для заполнения';
    }

    const numberValue = Number(trimmedValue);

    if (isNaN(numberValue)) {
        return 'Сечение должно быть числом';
    }

    if (numberValue <= 0) {
        return 'Сечение должно быть положительным числом';
    }

    return null;
};
