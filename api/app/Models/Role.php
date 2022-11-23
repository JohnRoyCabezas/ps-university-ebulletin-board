<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'role'
    ];

    public function roleUsers() {
        return $this->hasMany(RoleUser::class);
    }

    public function permissionRoles() {
        return $this->hasMany(PermissionRole::class);
    }

    public function courseUser()
    {
        return $this->hasMany(CourseUser::class);
    }
}
