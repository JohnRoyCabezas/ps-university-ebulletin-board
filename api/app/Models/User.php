<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'fullname',
        'email',
        'password',
        'avatar',
        'department_id',
        'is_verified'
    ];

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

    public function department() {
        return $this->belongsTo(Department::class);
    }

    public function announcement() {
        return $this->hasMany(Announcement::class);
    }

    public function chats() {
        return $this->hasMany(Chat::class);
    }

    public function files() {
        return $this->hasMany(File::class);
    }

    public function roleUser() {
        return $this->hasOne(RoleUser::class);
    }

    public function courseUsers() {
        return $this->hasMany(CourseUser::class);
    }

    public function threads() {
        return $this->hasMany(Thread::class);
    }
}
