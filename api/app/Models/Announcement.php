<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'announcementable_id',
        'announcementable_type',
        'user_id',
        'announcement'
    ];

    public function announcementable() {
        return $this->morphTo();
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
