<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Leadset extends Model
{
    protected $fillable = [
        'leadset_number',
        'description', 
        'customer',
        'status',
        'notes'
    ];

    // Связь с проводами
    public function wires(): HasMany
    {
        return $this->hasMany(LeadsetWire::class);
    }

    // Связь с терминалами
    public function terminals(): HasMany
    {
        return $this->hasMany(LeadsetTerminal::class);
    }

    // Связь с уплотнителями
    public function seals(): HasMany
    {
        return $this->hasMany(LeadsetSeal::class);
    }

    // Связь со стандартами обжима
    public function crimpStandards(): HasMany
    {
        return $this->hasMany(LeadsetCrimpStandard::class);
    }

    // Получить все провода с информацией о позиции
    public function wiresWithPosition()
    {
        return $this->hasMany(LeadsetWire::class)->with('wire');
    }

    // Получить все терминалы с информацией о позиции  
    public function terminalsWithPosition()
    {
        return $this->hasMany(LeadsetTerminal::class)->with('terminal');
    }
}