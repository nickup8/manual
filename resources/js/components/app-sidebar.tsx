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
    },
    {
        title: 'Провода',
        href: '/wires',
        icon: GitCommitHorizontal,
    },
    {
        title: 'Терминалы',
        href: '/terminals',
        icon: Cable,
    },
    {
        title: 'Уплотнители',
        href: '/seals',
        icon: CircleDot,
    },
    {
        title: 'Параметры обжима',
        href: '/crimping',
        icon: Diameter,
    },
    {
        title: 'Аппликаторы',
        href: '/applicators',
        icon: Hammer,
    },
    {
        title: 'Контроль качества',
        href: '/quality',
        icon: ShieldCheck,
    },
    {
        title: 'Пользователи',
        href: '/users',
        icon: Users,
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
