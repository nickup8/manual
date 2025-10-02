<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SealResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'part_number' => $this->part_number,
            'supplier_part_number' => $this->supplier_part_number,
            'supplier_name' => $this->supplier_name,
            'description' => $this->description,
            'color' => new SealColorResource($this->color),
            'created_at' => $this->created_at,
            'updated_at' => $this->created_at,
        ];
    }
}
