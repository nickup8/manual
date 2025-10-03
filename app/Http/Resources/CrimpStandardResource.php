<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CrimpStandardResource extends JsonResource
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
            'terminal' => new TerminalResource($this->terminal),
            'seal' => new SealResource($this->seal),
            'primary_wire_type' => new WireTypeResource($this->primaryWireType),
            'secondary_wire_type' => new WireTypeResource($this->secondaryWireType),
            'primary_wire_cross_section' => $this->primary_wire_cross_section,
            'secondary_wire_cross_section' => $this->secondary_wire_cross_section,
            'strip_length' => $this->strip_length,
            'conductor_crimp_height' => $this->conductor_crimp_height,
            'conductor_crimp_height_tolerance' => $this->conductor_crimp_height_tolerance,
            'conductor_crimp_width_min' => $this->conductor_crimp_width_min,
            'conductor_crimp_width_max' => $this->conductor_crimp_width_max,
            'insulation_crimp_height' => $this->insulation_crimp_height,
            'insulation_crimp_height_tolerance' => $this->insulation_crimp_height_tolerance,
            'insulation_crimp_width_min' => $this->insulation_crimp_width_min,
            'insulation_crimp_width_max' => $this->insulation_crimp_width_max,
            'primary_wire_separation_force' => $this->primary_wire_separation_force,
            'secondary_wire_separation_force' => $this->secondary_wire_separation_force,
            'location_wires' => $this->location_wires,
            'customer' => $this->customer,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
