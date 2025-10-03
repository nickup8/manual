<?php

namespace App\Services\Seal;

use App\Models\Seal;

class SealService
{
    public function createSeal($data)
    {
        $seal = Seal::create([
            'part_number' => $data['part_number'],
            'supplier_part_number' => $data['supplier_part_number'],
            'supplier_name' => $data['supplier_name'],
            'description' => $data['description'],
            'color_id' => $data['color'],
        ]);

        return $seal;
    }
}
