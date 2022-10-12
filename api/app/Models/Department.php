<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'college_id',
        'department'
    ];

    public function courses() {
        return $this->hasMany(Course::class);
    }

    public function college() {
        return $this->belongsTo(College::class);
    }

    public function announcements() {
        return $this->morphMany(Announcement::class, 'announcements');
    }

    public function user() {
        return $this->hasMany(User::class);
    }
}
