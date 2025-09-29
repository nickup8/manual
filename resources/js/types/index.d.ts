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
    icon?: LucideIcon | null;
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
    email: string;
    avatar?: string;
    email_verified_at: string | null;
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
