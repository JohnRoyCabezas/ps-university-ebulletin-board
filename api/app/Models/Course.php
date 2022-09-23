<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'department_id',
        'course'
    ];

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

    public function announcementables() {
        return $this->morphMany(Announcementable::class, 'announcementable');
    }
}
