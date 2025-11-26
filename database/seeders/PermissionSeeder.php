<?php

namespace Database\Seeders;

use App\Enums\PermissionsEnum;
use App\Enums\RolesEnum;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Очистка таблиц
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Создаём все разрешения из enum
        foreach (PermissionsEnum::cases() as $permission) {
            Permission::create(['name' => $permission->value]);
        }

        // Создаём роли и назначаем им разрешения
        $roles = [
            RolesEnum::TECHNICAL->value => [
                PermissionsEnum::CREATE_LEADSET->value,
                PermissionsEnum::EDIT_LEADSET->value,
                PermissionsEnum::VIEW_LEADSET->value,
                PermissionsEnum::CREATE_TERMINAL->value,
                PermissionsEnum::VIEW_TERMINAL->value,
                PermissionsEnum::CREATE_SEAL->value,
                PermissionsEnum::VIEW_SEAL->value,
                PermissionsEnum::CREATE_WIRE->value,
                PermissionsEnum::VIEW_WIRE->value,
            ],
            RolesEnum::OPERATOR->value => [
                PermissionsEnum::VIEW_LEADSET->value,
                PermissionsEnum::CREATE_LEADSET->value,
            ],
            RolesEnum::QUALITY->value => [
                PermissionsEnum::VIEW_LEADSET->value,
                PermissionsEnum::EDIT_LEADSET->value,
            ],
            RolesEnum::USERMANAGER->value => [
                PermissionsEnum::CREATE_USER->value,
                PermissionsEnum::EDIT_USER->value,
                PermissionsEnum::VIEW_USER->value,
                PermissionsEnum::DELETE_USER->value,
            ],
        ];

        foreach ($roles as $roleName => $permissions) {
            $role = Role::create(['name' => $roleName]);
            $role->givePermissionTo($permissions);
        }
    }
}