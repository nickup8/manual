<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeadsetCrimpStandard extends Model
{
    protected $fillable = [
        'leadset_id',
        'crimp_standard_id',
        'position'
    ];

    public function crimpStandard(): BelongsTo
    {
        return $this->belongsTo(CrimpStandard::class);
    }

    public function leadset(): BelongsTo
    {
        return $this->belongsTo(Leadset::class);
    }
}
