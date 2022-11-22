<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CourseUser extends Pivot
{
    use HasFactory;

    protected $table = 'course_user';

    public function course() {
        return $this->belongsTo(Course::class);
    }
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function role() {
        return $this->belongsTo(Role::class);
    }
}
