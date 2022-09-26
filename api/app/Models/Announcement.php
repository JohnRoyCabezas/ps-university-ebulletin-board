<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'announcementable_id',
        'announcementable_type',
        'announcement'
    ];

    public function announcementable() {
        return $this->morphTo();
    }
}