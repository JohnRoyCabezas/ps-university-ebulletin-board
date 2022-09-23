<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class College extends Model
{
    use HasFactory;

    protected $fillable = [
        'college'
    ];

    public function departments() {
        return $this->hasMany(Department::class);
    }
    
    public function announcementables() {
        return $this->morphMany(Announcementable::class, 'announcementable');
    }
}
