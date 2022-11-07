<?php

namespace App\Http\Controllers;

use App\Models\RoleUser;
use App\Models\User;
use App\Models\University;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Exception;

class UniversityController extends Controller
{
    public function index()
    {
        $universities = University::all();

        return response()->json($universities);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'university' => ['required', 'unique:universities'],
            'avatar' => ['max:255'],
            'fullname' => ['required', 'max:255'],
            'email' => ['required', 'unique:users'],
            'password' => ['required', 'confirmed'],
            'password_confirmation' => ['required']
        ]);

        try {
            DB::beginTransaction();

            $user = User::create([
                'avatar' => $validatedData['avatar'],
                'fullname' => $validatedData['fullname'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'is_verified' => true,
            ]);

            RoleUser::create([
                'user_id' => $user->id,
                'role_id' => 2,
            ]);

            $university = University::create([
                'user_id' => $user->id,
                'university' => $validatedData['university'],
            ]);

            $user->update([
                'university_id' => $university->id
            ]);

            DB::commit();

            return response()->json(
                [
                    'message' => 'University created!',
                ]
            );

        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

}
