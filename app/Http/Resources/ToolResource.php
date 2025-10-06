<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ToolResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            // 'id' => $this->id,
            'terminal' => new TerminalResource($this->terminal),
            'inventory_number' => $this->inventory_number,
            'seal' => new SealResource($this->seal),
            'any_seal' => $this->any_seal,
            'primary_wire_type' => new WireTypeResource($this->primaryWireType),
            'secondary_wire_type' => new WireTypeResource($this->secondaryWireType),
            'location' => $this->location,
            'customer' => $this->customer,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
