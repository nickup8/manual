import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Cable, CircleDot, Diameter, GitCommitHorizontal, GitMerge, Hammer, LayoutGrid, ShieldCheck, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Полуфабрикаты',
        href: '/leadsets',
        icon: GitMerge,
        permission: 'view-leadset',
    },
    {
        title: 'Провода',
        href: '/wires',
        icon: GitCommitHorizontal,
        permission: 'view-wire',
    },
    {
        title: 'Терминалы',
        href: '/terminals',
        icon: Cable,
        permission: 'view-terminal',
    },
    {
        title: 'Уплотнители',
        href: '/seals',
        icon: CircleDot,
        permission: 'view-seal',
    },
    {
        title: 'Параметры обжима',
        href: '/crimping',
        icon: Diameter,
        permission: 'view-crimping',
    },
    {
        title: 'Аппликаторы',
        href: '/applicators',
        icon: Hammer,
        permission: 'view-tool',
    },
    {
        title: 'Контроль качества',
        href: '/quality',
        icon: ShieldCheck,
        permission: 'view-quality',
    },
    {
        title: 'Пользователи',
        href: '/users',
        icon: Users,
        permission: 'view-user',
    },
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Пользователи',
//         href: '/users',
//         icon: Users,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
