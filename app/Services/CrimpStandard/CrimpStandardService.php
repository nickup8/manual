<?php

namespace App\Services\CrimpStandard;

use App\Models\CrimpStandard;
use App\Models\Seal;
use App\Models\Terminal;
use App\Models\WireType;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Builder;

class CrimpStandardService
{

    public function apply(Builder $query, array $filters): Builder
    {
        foreach ($filters as $filterType => $filterValue) {
            if (!empty($filterValue)) {
                $methodName = 'filterBy' . str_replace('_', '', ucwords($filterType, '_'));
                
                if (method_exists($this, $methodName)) {
                    $query = $this->{$methodName}($query, $filterValue);
                }
            }
        }

        return $query;
    }

    public function filterByTerminal(Builder $query, string $terminalPartNumber): Builder
    {
        $terminal = Terminal::where('part_number', $terminalPartNumber)->first();

        if ($terminal) {
            $query->where('terminal_id', $terminal->id);
        } else {
            $query->where('terminal_id', -1);
        }

        return $query;
    }

    public function filterBySeal(Builder $query, string $sealPartNumber): Builder
    {
        $seal = Seal::where('part_number', $sealPartNumber)->first();

        if ($seal) {
            $query->where('seal_id', $seal->id);
        } else {
            $query->where('seal_id', -1);
        }

        return $query;
    }

    // Дополнительные методы фильтрации
    public function filterByCustomer(Builder $query, string $customer): Builder
    {
        return $query->where('customer', 'LIKE', "%{$customer}%");
    }

    public function filterByWireType(Builder $query, string $wireTypeId): Builder
    {
        return $query->where(function ($q) use ($wireTypeId) {
            $q->where('primary_wire_type_id', $wireTypeId)
              ->orWhere('secondary_wire_type_id', $wireTypeId);
        });
    }
    public function store(array $data): array
    {
        $terminal = Terminal::where('part_number', $data['terminal'])->first();
        if (! $terminal) {
            throw ValidationException::withMessages(['terminal' => 'Терминал не найден']);
        }
        if (! empty($data['seal'])) {
            $seal = Seal::where('part_number', $data['seal'])->first();
            if (! $seal) {
                throw ValidationException::withMessages(['seal' => 'Уплотнитель не найден']);
            }
        }

        $primaryWireType = WireType::where('id', $data['primary_wire_type'])->first();

        if (! $primaryWireType) {
            throw ValidationException::withMessages(['primary_wire_type' => 'Тип провода не найден']);
        }

        if (! empty($data['secondary_wire_type'])) {
            $secondaryWireType = WireType::where('id', $data['secondary_wire_type'])->first();
            if (! $secondaryWireType) {
                throw ValidationException::withMessages(['secondary_wire_type' => 'Тип провода не найден']);
            }
        }

        $crimpStandard = CrimpStandard::create([
            'terminal_id' => $terminal->id,
            'seal_id' => ! empty($data['seal']) ? $seal->id : null,
            'primary_wire_type_id' => $primaryWireType->id,
            'secondary_wire_type_id' => ! empty($data['secondary_wire_type']) ? $secondaryWireType->id : null,
            'primary_wire_cross_section' => $data['primary_wire_cross_section'],
            'secondary_wire_cross_section' => ! empty($data['secondary_wire_cross_section']) ? $data['secondary_wire_cross_section'] : null,
            'strip_length' => $data['strip_length'],
            'conductor_crimp_height' => $data['conductor_crimp_height'],
            'conductor_crimp_height_tolerance' => $data['conductor_crimp_height_tolerance'],
            'conductor_crimp_width_min' => $data['conductor_crimp_width_min'],
            'conductor_crimp_width_max' => $data['conductor_crimp_width_max'],
            'insulation_crimp_height' => $data['insulation_crimp_height'],
            'insulation_crimp_height_tolerance' => $data['insulation_crimp_height_tolerance'],
            'insulation_crimp_width_min' => $data['insulation_crimp_width_min'],
            'insulation_crimp_width_max' => $data['insulation_crimp_width_max'],
            'primary_wire_separation_force' => $data['primary_wire_separation_force'],
            'secondary_wire_separation_force' => ! empty($data['secondary_wire_separation_force']) ? $data['secondary_wire_separation_force'] : null,
            'location_wires' => $data['location_wires'],
            'customer' => $data['customer'],
        ]);

        return [
            'crimpStandard' => $crimpStandard,
            'terminal' => $terminal,
        ];

    }
}
