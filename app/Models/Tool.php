<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tool extends Model
{
    protected $fillable = [
        'inventory_number',
        'terminal_id',
        'seal_id',
        'primary_wire_type_id',
        'secondary_wire_type_id',
        'location',
        'any_seal',
        'customer'
    ];

    public function primaryWireType(): BelongsTo
    {
        return $this->belongsTo(WireType::class, 'primary_wire_type_id');
    }

    public function secondaryWireType(): BelongsTo
    {
        return $this->belongsTo(WireType::class, 'secondary_wire_type_id');
    }

    public function terminal(): BelongsTo
    {
        return $this->belongsTo(Terminal::class, 'terminal_id');
    }

    public function seal(): BelongsTo
    {
        return $this->belongsTo(Seal::class, 'seal_id');
    }

}
