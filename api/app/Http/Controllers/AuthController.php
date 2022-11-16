<?php

namespace App\Http\Controllers;

use App\Models\RoleUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //get all users
    public function index()
    {
        return response()->json(User::all());
    }
    //register new user
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'avatar' => ['max:255'],
            'fullname' => ['required', 'max:255'],
            'department_id' => [''],
            'email' => ['required', 'unique:users'],
            'role_id' => ['required'],
            'university_id' => ['required'],
            // 'mobile_number' => ['required']
        ]);

        $user = User::create([
            'avatar' => $validatedData['avatar'],
            'fullname' => $validatedData['fullname'],
            'department_id' => $validatedData['department_id'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['email']),
            'is_verified' => false,
            'university_id' => $validatedData['university_id'],
            // 'mobile_number' => $validatedData['mobile_number']
        ]);

        RoleUser::create([
            'user_id' => $user->id,
            'role_id' => $validatedData['role_id'],
        ]);

        return response()->json([
            'Status' => 'Registration success!',
        ]);
    }
    //show user with given id
    public function show($id)
    {
        $user = User::with('roleUser.role')->find($id);

        return response()->json($user);
    }

    //update user detail with given id
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        $validatedData = $request->validate([
            'department_id' => 'required',
            'role_id' => 'required',
            'fullname' => 'required | max:255',
            'email' => 'required'
        ]);

        $user->update([
            'department_id' => $validatedData['department_id'],
            'fullname' => $validatedData['fullname'],
            'email' => $validatedData['email'],
        ]);

        $role_user = RoleUser::where('user_id', $id)->first();

        $role_user->update([
            'role_id' => $validatedData['role_id']
        ]);

        return response()->json(['message' => 'Updated user information!']);
    }

    //destroy user info with given id
    public function destroy($id)
    {
        $user = User::find($id);

        $user->delete();
        return response()->json(['message' => 'Soft deleted user!']);
    }
    //login user
    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        if (Auth::attempt($validatedData)) {
            $user_id = Auth::id();
            $user = User::with('roleUser.role')->find($user_id);

            $token = $user->createToken('access_token')->plainTextToken;

            $data = [
                'message' => 'Successfully logged in user!',
                'user' => $user,
                'token' => $token,
            ];
            return response()->json($data);
        } else {
            return response()->json(['error' => 'Invalid user credentials'], 403);
        }
    }
    //logout user
    public function logout()
    {
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        $data = [
            'message' => 'Logged out user!'
        ];

        return response()->json($data);
    }

}
