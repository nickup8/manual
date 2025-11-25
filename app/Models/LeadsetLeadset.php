<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeadsetLeadset extends Model
{
    protected $fillable = ['leadset_id', 'leadset_2_id', 'position'];

    public function leadsetOne()
    {
        return $this->belongsTo(Leadset::class, 'leadset_id');
    }
    
}
