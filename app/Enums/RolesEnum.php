<?php

namespace App\Enums;

enum RolesEnum: string
{
    case TECHNICAL = 'technical';
    case OPERATOR = 'operator';
    case QUALITY = 'quality';
    case USERMANAGER = 'user_manager';

    public function labels(): array
    {
        return [
            
            self::TECHNICAL->value => 'Инженер-технолог',
            self::OPERATOR->value => 'Оператор',
            self::QUALITY->value => 'Контролер качества',
            self::USERMANAGER->value => 'Менеджер пользователей',
        ];
    }

    public function label(): string
    {
        return match ($this) {
            
            self::TECHNICAL => 'Инженер-технолог',
            self::OPERATOR => 'Оператор',
            self::QUALITY => 'Контролер качества',
            self::USERMANAGER => 'Менеджер пользователей',
        };
    }
}