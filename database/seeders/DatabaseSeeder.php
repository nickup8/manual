<?php

namespace Database\Seeders;

use App\Enums\PermissionsEnum;
use App\Enums\RolesEnum;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\WireColor;
use DB;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            PermissionSeeder::class,
        ]);

        

        // User::factory(10)->create();

        User::create([
            'name' => 'Николай',
            'last_name' => 'Сироткин',
            'login' => '4500',
            'password' => bcrypt('password'),
        ])->assignRole(['technical', 'user_manager']);

        $wire_colors = [
            ['name' => 'Черный',          'short' => 'Ч', 'hex' => '#000000'],
            ['name' => 'Красный',         'short' => 'К', 'hex' => '#FF0000'],
            ['name' => 'Жёлтый',          'short' => 'Ж', 'hex' => '#FFFF00'],
            ['name' => 'Оранжевый',       'short' => 'О', 'hex' => '#FFA500'],
            ['name' => 'Голубой',         'short' => 'Г', 'hex' => '#2CBCEB'],
            ['name' => 'Коричневый',      'short' => 'Кч', 'hex' => '#A52A2A'],
            ['name' => 'Зелёный',         'short' => 'З', 'hex' => '#008000'],
            ['name' => 'Белый',           'short' => 'Б', 'hex' => '#EEEEEE'],
            ['name' => 'Фиолетовый',      'short' => 'Ф', 'hex' => '#800080'],
            ['name' => 'Серый',           'short' => 'С', 'hex' => '#808080'],
            ['name' => 'Розовый',         'short' => 'Р', 'hex' => '#FFC0CB'],
            ['name' => 'Светло зелёный',  'short' => 'Сз', 'hex' => '#90EE90'],
            ['name' => 'Бирюзовый',       'short' => 'Бр', 'hex' => '#40E0D0'],
            ['name' => 'Бежевый',         'short' => 'Бж', 'hex' => '#F5F5DC'],
            ['name' => 'Лавандовый',      'short' => 'Л', 'hex' => '#E6E6FA'],
            ['name' => 'Небесно-голубой', 'short' => 'Нг', 'hex' => '#87CEEB'],
        ];

        foreach ($wire_colors as $wire_color) {
            WireColor::create([
                'color_name' => $wire_color['name'],
                'color_code' => $wire_color['hex'],
                'color_short' => $wire_color['short'],
            ]);
        }

        $seal_colors = [
            ['name' => 'Синий',      'hex' => '#0000CD'],
            ['name' => 'Зеленый',    'hex' => '#006400'],
            ['name' => 'Белый',      'hex' => '#F8F8FF'],
            ['name' => 'Жёлтый',     'hex' => '#FFD700'],
            ['name' => 'Серый',      'hex' => '#A9A9A9'],
            ['name' => 'Коричневый', 'hex' => '#8B4513'],
            ['name' => 'Чёрный',     'hex' => '#1C1C1C'],
            ['name' => 'Красный',    'hex' => '#B22222'],
            ['name' => 'Оранжевый',  'hex' => '#FF8C00'],
            ['name' => 'Фиолетовый', 'hex' => '#9370DB'],
        ];

        foreach ($seal_colors as $seal_color) {
            DB::table('color_seals')->insert([
                'color_name' => $seal_color['name'],
                'color_code' => $seal_color['hex'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

    }
}
