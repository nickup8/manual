<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Terminal extends Model
{
    protected $fillable = [
        'part_number',
        'supplier_part_number',
        'supplier_name',
        'description',
    ];
}
