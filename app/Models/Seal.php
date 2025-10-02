<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seal extends Model
{
    protected $fillable = [
        'part_number',
        'supplier_part_number',
        'supplier_name',
        'description',
        'color_id',
    ];

    public function color() {
        return $this->belongsTo(ColorSeal::class, 'color_id');
    }
}
