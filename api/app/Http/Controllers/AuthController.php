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
            'fullname' => ['required', 'unique:users', 'max:255'],
            'email' => ['required', 'unique:users'],
            'department_id' => ['required'],
            'avatar' => ['max:255'],
            'role' => ['max:255']
        ]);

        $user = User::create([
            'fullname' => $validatedData['fullname'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['email']),
            'department_id' => $validatedData['department_id'],
            'avatar' => $validatedData['avatar'],
        ]);

        $role = RoleUser::create([
            'user_id' => $user->id,
            'role_id' => 1
        ]);

        return response()->json([
            'Status' => 'Registeration success!',
            'Role' => $role->role->role
        ]);
    }
}
