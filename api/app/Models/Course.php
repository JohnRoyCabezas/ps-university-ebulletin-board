<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user() {
        return $this->belongsToMany(User::class)
        ->using(CourseUser::class)
        ->withTimestamps()
        ->withPivot('course_user');
    }

    public function courseUsers() {
        return $this->hasMany(CourseUser::class);
    }

    public function department() {
        return $this->belongsTo(Department::class);
    }

    public function files() {
        return $this->hasMany(File::class);
    }

    public function chats() {
        return $this->hasMany(Chat::class);
    }

    public function announcements() {
        return $this->morphMany(Announcement::class, 'announcements');
    }
}
