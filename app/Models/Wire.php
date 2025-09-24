<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wire extends Model
{
    protected $fillable = ['wire_code', 'wire_type_id', 'cross_section', 'description', 'base_color_id', 'stripe_color_id'];
}
