<?php

namespace App\Enums;

enum PermissionsEnum: string
{
    // Права на Leadset
    case CREATE_LEADSET = 'create-leadset';
    case EDIT_LEADSET = 'edit-leadset';
    case VIEW_LEADSET = 'view-leadset';
    case DELETE_LEADSET = 'delete-leadset';

    // Права на пользователей
    case CREATE_USER = 'create-user';
    case EDIT_USER = 'edit-user';
    case VIEW_USER = 'view-user';
    case DELETE_USER = 'delete-user';

    // Права на терминалы
    case CREATE_TERMINAL = 'create-terminal';
    case EDIT_TERMINAL = 'edit-terminal';
    case VIEW_TERMINAL = 'view-terminal';
    case DELETE_TERMINAL = 'delete-terminal';

    // Права на уплотнители
    case CREATE_SEAL = 'create-seal';
    case EDIT_SEAL = 'edit-seal';
    case VIEW_SEAL = 'view-seal';
    case DELETE_SEAL = 'delete-seal';

    // Права на провода
    case CREATE_WIRE = 'create-wire';
    case EDIT_WIRE = 'edit-wire';
    case VIEW_WIRE = 'view-wire';
    case DELETE_WIRE = 'delete-wire';
    
    // аппликаторы
    case CREATE_TOOL = 'create-tool';
    case EDIT_TOOL = 'edit-tool';
    case VIEW_TOOL = 'view-tool';
    case DELETE_TOOL = 'delete-tool';

    // Права на параметры обжима

    case VIEW_CRIMPING = 'view-crimping';
    case EDIT_CRIMPING = 'edit-crimping';

    case CREATE_CRIMPING = 'create-crimping';

    case DELETE_CRIMPING = 'delete-crimping';

    // Права на просмотр всех данных

    case VIEW_ALL = 'view-all';


    // Метод для получения русского названия
    public function label(): string
    {
        return match ($this) {
            self::CREATE_LEADSET => 'Создание полуфабриката',
            self::EDIT_LEADSET => 'Редактирование полуфабриката',
            self::VIEW_LEADSET => 'Просмотр полуфабриката',
            self::DELETE_LEADSET => 'Удаление полуфабриката',

            self::CREATE_USER => 'Создание пользователя',
            self::EDIT_USER => 'Редактирование пользователя',
            self::VIEW_USER => 'Просмотр пользователя',
            self::DELETE_USER => 'Удаление пользователя',

            self::CREATE_TERMINAL => 'Создание терминала',
            self::EDIT_TERMINAL => 'Редактирование терминала',
            self::VIEW_TERMINAL => 'Просмотр терминала',
            self::DELETE_TERMINAL => 'Удаление терминала',

            self::CREATE_SEAL => 'Создание уплотнителя',
            self::EDIT_SEAL => 'Редактирование уплотнителя',
            self::VIEW_SEAL => 'Просмотр уплотнителя',
            self::DELETE_SEAL => 'Удаление уплотнителя',

            self::CREATE_WIRE => 'Создание провода',
            self::EDIT_WIRE => 'Редактирование провода',
            self::VIEW_WIRE => 'Просмотр провода',
            self::DELETE_WIRE => 'Удаление провода',

            self::VIEW_ALL => 'Просмотр всех данных',

            self::CREATE_TOOL => 'Создание аппликатора',
            self::EDIT_TOOL => 'Редактирование аппликатора',
            self::VIEW_TOOL => 'Просмотр аппликатора',
            self::DELETE_TOOL => 'Удаление аппликатора',

            self::VIEW_CRIMPING => 'Просмотр параметров обжима',
            self::EDIT_CRIMPING => 'Редактирование параметров обжима',
            self::CREATE_CRIMPING => 'Создание параметров обжима',
            self::DELETE_CRIMPING => 'Удаление параметров обжима',
        };
    }

    // Метод для получения всех разрешений (опционально)
    public static function all(): array
    {
        return array_map(fn($p) => $p->value, self::cases());
    }

    // Метод для получения всех разрешений с названиями
    public static function allWithLabels(): array
    {
        return array_map(fn($p) => [
            'value' => $p->value,
            'label' => $p->label(),
        ], self::cases());
    }
}