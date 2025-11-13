<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeadsetSeal extends Model
{
    protected $fillable = [
        'leadset_id',
        'seal_id',
        'position',
    ];

    public function leadset(): BelongsTo
    {
        return $this->belongsTo(Leadset::class);
    }

    public function seal(): BelongsTo
    {
        return $this->belongsTo(Seal::class);
    }
}
