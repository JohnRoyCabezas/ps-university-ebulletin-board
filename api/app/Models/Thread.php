<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Thread extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $guarded = [];

    public function announcement()
    {
        return $this->belongsTo(Announcement::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('file')->singleFile();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeThread($query)
    {
        return $query->with('threads');
    }
}
