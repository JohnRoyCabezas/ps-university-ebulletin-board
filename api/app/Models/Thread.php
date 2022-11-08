<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function announcement() {
        return $this->belongsTo(Announcement::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function scopeThread($query) {
        return $query->with('threads');
    }
}
