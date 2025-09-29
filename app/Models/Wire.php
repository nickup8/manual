<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wire extends Model
{
    protected $fillable = ['wire_code', 'wire_type_id', 'cross_section', 'description', 'base_color_id', 'stripe_color_id'];

    public function wireType()
    {
        return $this->belongsTo(WireType::class);
    }

    public function baseColor()
    {
        return $this->belongsTo(WireColor::class, 'base_color_id');
    }

    public function stripeColor()
    {
        return $this->belongsTo(WireColor::class, 'stripe_color_id');
    }
    
}
