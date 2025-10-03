<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CrimpStandard extends Model
{
    protected $fillable = [
        'terminal_id',
        'seal_id',
        'primary_wire_type_id',
        'secondary_wire_type_id',
        'primary_wire_cross_section',
        'secondary_wire_cross_section',
        'strip_length',
        'conductor_crimp_height',
        'conductor_crimp_height_tolerance',
        'conductor_crimp_width_min',
        'conductor_crimp_width_max',
        'insulation_crimp_height',
        'insulation_crimp_height_tolerance',
        'insulation_crimp_width_min',
        'insulation_crimp_width_max',
        'primary_wire_separation_force',
        'secondary_wire_separation_force',
        'location_wires',
        'customer',
    ];

    public function terminal(): BelongsTo
    {
        return $this->belongsTo(Terminal::class, 'terminal_id');
    }

    public function seal(): BelongsTo
    {
        return $this->belongsTo(Seal::class, 'seal_id');
    }

    public function primaryWireType(): BelongsTo
    {
        return $this->belongsTo(WireType::class, 'primary_wire_type_id');
    }

    public function secondaryWireType(): BelongsTo
    {
        return $this->belongsTo(WireType::class, 'secondary_wire_type_id');
    }
}
