<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ColorSeal extends Model
{
   protected $table = 'color_seals'; // ⚠️ Убедитесь что таблица существует
    
    protected $fillable = [
        'color_name',
        'color_code',
    ];
}
