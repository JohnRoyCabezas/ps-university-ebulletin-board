<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\College;
use App\Models\User;
use App\Models\University;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DepartmentController extends Controller
{
    public function index(Request $request)
    {
        $allDepartments = collect();
        $university = University::findOrFail($request->university_id);
        $colleges = College::whereBelongsTo($university)->get();
        foreach ($colleges as $college) {
            $allDepartments = $allDepartments->merge(Department::whereBelongsTo($college)->get());
        }

        return response()->json($allDepartments);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate(
            [
                'college_id' => ['required'],
                'user_id' => ['required'],
                'department' => ['required'],
                'department_information' => ['required'],
            ]
        );

        try {
            DB::beginTransaction();

            $department = Department::create([
                'college_id' => $request['college_id'],
                'user_id' => $request['user_id'],
                'department' => $request['department'],
                'department_information' => $request['department_information'],
            ]);

            $user = User::findOrFail($validatedData['user_id']);
            $user->department_id = $department->id;
            $user->save();

            DB::commit();

            return response()->json(
                [
                    'status' => 'Department created!',
                    'user' => $user,
                ]
            );
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        $department = Department::findOrFail($id);

        return response()->json($department);
    }

    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $department = Department::findOrFail($id);
            if ($department->user_id != $request->user_id) {
                $user = User::findOrFail($department->user_id);
                $user->department_id = null;
                $user->save();
                $user = User::findOrFail($request->user_id);
                $user->department_id = $id;
                $user->save();
            }
            $department->update($request->all());

            DB::commit();

            return response()->json(
                [
                    'status' => 'Department Updated!',
                ]
            );
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $department = Department::findOrFail($id);
        $user = User::findOrFail($department->user_id);
        $user->department_id = null;
        $user->save();
        Department::destroy($id);

        return response()->json(
            [
                'Status' => 'Department Deleted!',
            ]
        );
    }
}
