<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\RoleUser;
use App\Models\User;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function getUsers(Request $request)
    {
        // if ($request->keyword) 
        // {
        //     $users = User::with(['roleUser','department'])->where('fullname', 'like', '%' . $request->keyword . '%')
        //     ->orderBy($request->order_name, $request->order_direction)
        //     ->paginate($request->items_per_page);

        //     return response()->json($users);
        // }

        // $users = User::with('roleUser')
        // ->orderBy($request->order_name, $request->order_direction)
        // ->paginate($request->items_per_page);

        // return response()->json($users);

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
