import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | ComponentType<SVGProps<SVGSVGElement>> | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    last_name: string;
    avatar?: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface WireType {
    id: number;
    type_name: string;
    type_code: string;
}

export interface PaginationLinks {
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
}

export interface PaginationMetaLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    links: PaginationMetaLink[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}

export interface PropsResponse<T> {
    data: T[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

export interface SelectOption {
    label: string;
    value: string;
}

export interface WireColor {
    id: number;
    color_name: string;
    color_code: string;
}

export interface WireType {
    id: number;
    type_name: string;
    type_code: string;
}

export interface Wire {
    id: number;
    wire_code: string;
    wire_type: WireType;
    cross_section: number;
    description: string;
    base_color: WireColor;
    stripe_color: WireColor;
}

export interface FilterConfig {
    [key: string]: string;
}

export interface ActiveFilter {
    key: string;
    value: any;
    label: string;
}

export interface WireFilterParams {
    wire_code?: string;
    wire_type_id?: string;
    cross_section?: string;
    base_color_id?: string;
    stripe_color_id?: string;
    description?: string;
}

export interface Terminal {
    id: number;
    part_number: string;
    supplier_part_number: string;
    supplier_name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface Seal {
    id: number;
    part_number: string;
    supplier_part_number: string;
    supplier_name: string;
    description: string;
    color: SealColor;
    created_at: string;
    updated_at: string;
}

export interface SealColor {
    id: number;
    color_name: string;
    color_code: string;
}

export type LocationWires = 'inside' | 'near';

export interface CrimpStandard {
    id: number;
    terminal: Terminal;
    seal: Seal;
    primary_wire_type: WireType;
    secondary_wire_type: WireType | null;
    primary_wire_cross_section: number;
    secondary_wire_cross_section: number | null;
    strip_length: number;
    conductor_crimp_height: number;
    conductor_crimp_height_tolerance: number;
    conductor_crimp_width_min: number;
    conductor_crimp_width_max: number;
    insulation_crimp_height: number;
    insulation_crimp_height_tolerance: number;
    insulation_crimp_width_min: number;
    insulation_crimp_width_max: number;
    primary_wire_separation_force: number;
    secondary_wire_separation_force: number | null;
    location_wires: LocationWires | null;
    customer: string;
    created_at: string;
    updated_at: string;
}

export interface Tool {
    inventory_number: string;
    terminal: Terminal;
    seal: Seal | null;
    any_seal: string | null;
    primary_wire_type: WireType;
    secondary_wire_type: WireType | null;
    location: string | null;
    created_at: string;
    updated_at: string;
}

export interface Leadset {
    id: number;
    leadsetNumber: string;
    description: string;
    created_at: string;
    updated_at: string;
    terminals: {
        terminal: Terminal;
    }[];
    seals: Seal[];
    wires: {
        wire: Wire;
        wireName: string;
    }[];
}
