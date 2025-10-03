<?php

namespace App\Services\Wire;

use App\Models\Wire;
use App\Models\WireType;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class WireService
{
    public function __construct() {}

    public function createWireType($data)
    {

        $wire_type = WireType::create([
            'type_name' => $data['type_name'],
            'type_code' => $data['type_code'],
        ]);

        return $wire_type;
    }

    public function createWire($data)
    {

        $wire_type = WireType::where('id', $data['wire_type_id'])->first();

        if (! $wire_type) {
            throw ValidationException::withMessages(['wire_type_id' => 'Тип провода не найден']);
        }

        $wire_type_code = Str::upper($wire_type->type_code);

        if ($wire_type_code !== Str::of($data['wire_code'])->take(3)->upper()->toString()) {
            throw ValidationException::withMessages(['wire_code' => 'Код провода (YPN), должен начинаться с кода типа провода']);
        }
        if (Wire::where('wire_code', $data['wire_code'])->exists()) {
            throw ValidationException::withMessages([
                'wire_code' => 'Провод с таким кодом уже существует',
            ]);
        }

        $wire = Wire::create([
            'wire_code' => $data['wire_code'],
            'wire_type_id' => $wire_type->id,
            'cross_section' => $data['cross_section'],
            'description' => $data['description'],
            'base_color_id' => $data['base_color_id'],
            'stripe_color_id' => $data['stripe_color_id'],
        ]);

        return $wire;
    }
}
