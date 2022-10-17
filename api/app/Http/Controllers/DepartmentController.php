<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::all()->sortDesc();

        return response()->json($departments);
    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'college_id' => ['required'],
                'user_id' => ['required'],
                'department' => ['required', 'unique:departments'],
                'department_information' => ['required'],
            ]
        );

        Department::create([
            'college_id' => $request['college_id'],
            'user_id' => $request['user_id'],
            'department' => $request['department'],
            'department_information' => $request['department_information'],
        ]);

        return response()->json(
            [
                'status' => 'Department created!',
            ]
        );
    }

    public function show($id)
    {
        $department = Department::findOrFail($id);

        return response()->json($department);
    }

    public function update(Request $request, $id)
    {
        $request->validate(
            [
                'college_id' => ['required'],
                'user_id' => ['required'],
                'department' => ['required', 'unique:departments'],
                'department_information' => ['required'],
            ]
        );

        $department = Department::findOrFail($id);
        $department->update($request->all());

        return response()->json(
            [
                'status' => 'Department Updated!',

            ]
        );
    }

    public function destroy($id)
    {
        Department::destroy($id);

        return response()->json(
            [
                'Status' => 'Department Deleted!',
            ]
        );
    }
}
