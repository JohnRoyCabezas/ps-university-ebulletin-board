<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class User extends Authenticatable implements HasMedia
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function colleges()
    {
        return $this->hasMany(College::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('file')->singleFile();
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function announcement()
    {
        return $this->hasMany(Announcement::class);
    }

    public function chats()
    {
        return $this->hasMany(Chat::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function roleUser()
    {
        return $this->hasOne(RoleUser::class);
    }

    public function courseUser()
    {
        return $this->hasMany(CourseUser::class);
    }

    public function threads()
    {
        return $this->hasMany(Thread::class);
    }

    public function university()
    {
        return $this->belongsTo(University::class);
    }

    public function isAdmin()
    {
        return $this->roleUser()->where('role_id', 2)->exists();
    }

    public function isStudent()
    {
        return $this->roleUser()->where('role_id', 1)->exists();
    }

    public function scopeStudent($query)
    {
        $query->whereHas('roleUser', function ($query) {
            $query->where('role_id', '=', 1);
        });
    }

    public function scopeInstructor($query)
    {
        $query->whereHas('roleUser', function ($query) {
            $query->where('role_id', '=', 5);
        });
    }
}
