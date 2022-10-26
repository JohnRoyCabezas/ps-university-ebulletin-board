<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class University extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'university',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function colleges()
    {
        return $this->hasMany(College::class);
    }

}
