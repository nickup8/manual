<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeadsetWire extends Model
{
    protected $fillable = [
        'leadset_id',
        'wire_id', 
        'wire_name',
        'position'
    ];

    public function leadset(): BelongsTo
    {
        return $this->belongsTo(Leadset::class);
    }

    public function wire(): BelongsTo
    {
        return $this->belongsTo(Wire::class);
    }
}