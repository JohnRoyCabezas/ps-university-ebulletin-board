<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ChangepasswordController extends Controller
{
    public function ChangePassword(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'old_password' => 'required',
            'new_password' => 'required',
        ]);

        if (Hash::check($request->old_password, auth()->user()->password)) {
            User::whereId(auth()->user()->id)->update(
                [
                    'password' => Hash::make($request->new_password),
                    'is_verified' => true,
                ]
            );

            return response()->json(['Message' => 'Password updated!', 'Status' => true]);
        } else {return response()->json(
            [
                'Message' => 'Old password does not match!',
                'Status' => false,
            ]);}
    }

    public function ChangeTheme(Request $request, $id)
    {
        $request->validate([
            'theme' => 'required',
        ]);

        $user = User::findOrFail($id);
        $user->update($request->all());

        return response()->json(['message' => 'Theme Changed!']);
    }
}
