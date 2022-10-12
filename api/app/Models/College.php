<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class College extends Model
{
    use HasFactory;

    protected $guarded = [
   
    ];
   
    public function university() {
        return $this->belongsTo(University::class);
    }
    
    public function departments() {
        return $this->hasMany(Department::class);
    }
    
    public function announcements() {
        return $this->morphMany(Announcement::class, 'announcements');
    }
}
