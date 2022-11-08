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
        'user_id',
        'announcement',
        'is_locked'
    ];

    public function announcementable() {
        return $this->morphTo();
    }

    public function thread() {
        return $this->hasMany(Thread::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function scopeChannel($query, $request) {
        return $query->where('announcementable_type', $request->announcementable_type)
        ->where('announcementable_id', $request->announcementable_id);
    }
}
