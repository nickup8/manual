<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeadsetResource extends JsonResource
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
            'leadsetNumber' => $this->leadset_number,
            'status' => $this->status,
            'customer' => $this->customer,
            'description' => $this->description,
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'wires' => $this->whenLoaded('wires', fn() => $this->wires->map(function ($lt) {
                return [
                    'wireName' => $lt->wire_name,
                    'wire' => new WireResource($lt->wire), // 💡 Включаем полную информацию о терминале
                ];
            }), []),
            'terminals' => $this->whenLoaded('terminals', fn() => $this->terminals->map(function ($lt) {
                return [
                    'position' => $lt->position,
                    'terminal' => new TerminalResource($lt->terminal), // 💡 Включаем полную информацию о терминале
                ];
            }), []),
            'seals' => $this->whenLoaded('seals', fn() => SealResource::collection($this->seals), []),
        ];
    }
}