<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function courses() {
        return $this->hasMany(Course::class)->orderBy('created_at');
    }

    public function college() {
        return $this->belongsTo(College::class);
    }

    public function announcements() {
        return $this->morphMany(Announcement::class, 'announcements');
    }

    public function university() {
        return $this->belongsTo(University::class);
    }

    public function user() {
        return $this->hasMany(User::class);
    }
}
