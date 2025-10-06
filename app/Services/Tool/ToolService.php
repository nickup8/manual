<?php

namespace App\Services\Tool;

use App\Models\Seal;
use App\Models\Terminal;
use App\Models\Tool;
use App\Models\WireType;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Builder;

class ToolService
{
    public function storeTool(array $data): Tool
{
    // Валидация и поиск терминала
    $terminal = Terminal::where('part_number', $data['terminal'])->first();
    if (!$terminal) {
        throw ValidationException::withMessages(['terminal' => 'Терминал не найден']);
    }

    // Валидация и поиск уплотнителя
    $seal = null;
    $any_seal = null;
    if (!empty($data['seal'])) {
        if ($data['seal'] === '*') {
           
            $any_seal = "*";
        } else {
            $seal = Seal::where('part_number', $data['seal'])->first();
            if (!$seal) {
                throw ValidationException::withMessages(['seal' => 'Уплотнитель не найден']);
            }
        }
    }

    // Валидация и поиск основного типа провода
    $primaryWireType = WireType::where('id', $data['primary_wire_type'])->first();
    if (!$primaryWireType) {
        throw ValidationException::withMessages(['primary_wire_type' => 'Тип провода 1 не найден']);
    }

    // Валидация и поиск дополнительного типа провода
    $secondaryWireType = null;
    if (!empty($data['secondary_wire_type'])) {
        $secondaryWireType = WireType::where('id', $data['secondary_wire_type'])->first(); // ⚠️ Исправлено: должно быть 'id', а не 'name'
        if (!$secondaryWireType) {
            throw ValidationException::withMessages(['secondary_wire_type' => 'Тип провода 2 не найден']);
        }
    }

    // Создание инструмента
    return Tool::create([
        'inventory_number' => $data['inventory_number'],
        'terminal_id' => $terminal->id,
        'seal_id' => $seal?->id,
        'any_seal' => $any_seal,
        'primary_wire_type_id' => $primaryWireType->id,
        'secondary_wire_type_id' => $secondaryWireType?->id,
        'location' => $data['location'],
        'customer' => $data['customer'],
    ]);
}

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
       if ($sealPartNumber === '*') {
            $query->where('any_seal', '*');
        } else {
             $seal = Seal::where('part_number', $sealPartNumber)->first();

        if ($seal) {
            $query->where('seal_id', $seal->id);
        } else {
            $query->where('seal_id', -1);
        }
        }

        return $query;
    }
}