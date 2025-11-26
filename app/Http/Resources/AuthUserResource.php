<?php

namespace App\Http\Resources;

use App\Enums\RolesEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthUserResource extends JsonResource
{

    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'last_name' => $this->last_name,
            'login' => $this->login,
            'role' => $this->getRoleNames()->map(function ($role) {
                $enum = RolesEnum::tryFrom($role);
                return [
                    'name' => $role,
                    'label' => $enum ? $enum->label() : $role, // Выводим русское имя
                ];
            }),
            'permissions' => $this->getAllPermissions()->pluck('name'),
        ];
    }
}
