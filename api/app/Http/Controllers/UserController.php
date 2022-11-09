<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseUser;
use App\Models\User;
use App\Models\Department;
use App\Models\College;
use App\Models\University;
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
            $user = User::with('courseUser.course')->with('department.college.university')->find($user->id);
        }

        return response()->json($user);
    }

    public function getDeans(Request $request)
    {
        $deans = User::whereHas('roleUser', function ($query) {
            $query->where('role_id', '=', 4);
        })->where('university_id', $request->university_id)->get();

        return response()->json($deans);
    }

    public function getUsers(Request $request)
    {
        if ($request->keyword) {
            $selectUsers = User::with(['roleUser.role', 'department'])->where('university_id', $request->university_id)
                ->where('fullname', 'ilike', '%' . $request->keyword . '%')
                ->orderBy($request->order_name, $request->order_direction)
                ->paginate($request->items_per_page);

                return response()->json($selectUsers);
            }

        $selectUsers = User::with(['roleUser.role', 'department'])->where('university_id', $request->university_id)
            ->orderBy($request->order_name, $request->order_direction)
            ->paginate($request->items_per_page);

        return response()->json($selectUsers);
    }

    public function getStudents(Request $request)
    {
        $students = User::student()->where('university_id', $request->university_id)->get();

        return response()->json($students);
    }

    public function getInstructors(Request $request)
    {
        $instructors = User::instructor()->where('university_id', $request->university_id)->get();

        return response()->json($instructors);
    }
}
