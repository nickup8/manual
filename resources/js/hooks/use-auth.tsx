// hooks/useAuth.ts
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export const useAuth = () => {
    const { auth } = usePage<SharedData>().props;

    // Теперь TypeScript знает, что это Permission[] и Role[]
    const permissions = auth?.user.permissions || [];
    const roles = auth?.user.roles || [];

    const can = (permissionName: string) => {
        return permissions.some((p) => p === permissionName);
    };

    const hasRole = (roleName: string) => {
        return roles.some((r) => r.name === roleName);
    };

    return {
        auth,
        permissions,
        roles,
        can,
        hasRole,
    };
};
