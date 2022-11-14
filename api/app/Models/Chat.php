<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Chat extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $fillable = [
        'user_id',
        'course_id',
        'chat'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function course() {
        return $this->belongsTo(Course::class);
    }

    public function comments() 
    {
        return $this->hasMany(Comment::class)->orderBy('created_at');
    }
}
