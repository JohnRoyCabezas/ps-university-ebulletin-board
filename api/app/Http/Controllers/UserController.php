<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function getAdmins()
    {
        $admins = User::with('roleUser')->whereHas('roleUser', function ($query) {
            $query->where('role_id', '=', 2);
        })->get();

        return response()->json($admins);
    }

    public function getUsers(Request $request)
    {
        if ($request->keyword) {
            $users = User::with(['roleUser.role', 'department'])
                ->where('fullname', 'ilike', '%' . $request->keyword . '%')
                ->orderBy($request->order_name, $request->order_direction)
                ->paginate($request->items_per_page);

            return response()->json($users);
        }

        $users = User::with(['roleUser.role', 'department'])
            ->orderBy($request->order_name, $request->order_direction)
            ->paginate($request->items_per_page);

        return response()->json($users);
    }
}