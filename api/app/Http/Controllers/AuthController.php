<?php

namespace App\Http\Controllers;

use App\Models\RoleUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'avatar' => ['max:255'],
            'fullname' => ['required', 'unique:users', 'max:255'],
            'department_id' => ['required'],
            'email' => ['required', 'unique:users'],
            'role' => ['required']
        ]);

        $user = User::create([
            'avatar' => $validatedData['avatar'],
            'fullname' => $validatedData['fullname'],
            'department_id' => $validatedData['department_id'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['email']),
            'is_verified' => false
        ]);

        RoleUser::create([
            'user_id' => $user->id,
            'role_id' => $validatedData['role'],
        ]);

        return response()->json([
            'Status' => 'Registration success!',
        ]);
    }
}
