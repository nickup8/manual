<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeadsetTerminal extends Model
{
    protected $fillable = ['leadset_id', 'terminal_id', 'position'];

    public function leadset(): BelongsTo
    {
        return $this->belongsTo(Leadset::class);
    }

    public function terminal(): BelongsTo
    {
        return $this->belongsTo(Terminal::class);
    }
}