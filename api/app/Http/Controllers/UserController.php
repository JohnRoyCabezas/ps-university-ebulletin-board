<?php

namespace App\Http\Controllers;

use App\Models\College;
use App\Models\Course;
use App\Models\Department;
use App\Models\User;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getAuthUser()
    {
        $user = Auth::user();
        
        if ($user->isAdmin()) {
            $user = User::with('university.colleges.departments.courses')->find($user->id);
        } else {
            $user = User::with('department.college.university', 'courseUsers.course')->find($user->id);
        }

        return response()->json($user);
    }

    public function getAdmins()
    {
        $admins = User::whereHas('roleUser', function ($query) {
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