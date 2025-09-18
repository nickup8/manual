<?php


namespace App\Services\Wire;

use App\Http\Requests\WireTypeStoreRequest;
use App\Models\WireType;


class WireService
{
    public function __construct()
    {
    }

    public function createWireType($data)
    {
        

        $wire_type = WireType::create([
            'type_name' => $data['type_name'],
            'type_code' => $data['type_code'],
        ]);

        return $wire_type;
    }
}