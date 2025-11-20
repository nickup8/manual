<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WireResource extends JsonResource
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
            'wire_code' => $this->wire_code,
            'wire_type' => new WireTypeResource($this->wireType),
            'cross_section' => $this->cross_section,
            'description' => $this->description,
            'base_color' => $this->baseColor,
            'stripe_color' => $this->stripeColor,
        ];
    }
}
