<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseUser;
use App\Models\Department;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::all();

        return response()->json($courses);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate(
            [
                'course' => ['required'],
                'department_id' => ['required'],
                'user_ids' => ['required'],
                'instructor_id' => ['required']
            ]
        );

        try {
            DB::beginTransaction();

            $course = Course::create(
                [
                    'department_id' => $validatedData['department_id'],
                    'course' => $validatedData['course'],
                ]
            );

            $user_ids = explode(',', $validatedData['user_ids']);

            $course->user()->attach($user_ids);
            $course->user()->attach($validatedData['instructor_id']);

            DB::commit();

            return response()->json(
                [
                    'message' => 'Class created!',
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
        $course = Course::findOrFail($id);
        $course->courseUsers;

        return response()->json(
            [
                'course_detail' => $course,

            ]
        );
    }

    public function update(Request $request, $id)
    {
        $request->validate(
            [
                'course' => ['required'],
                'department' => ['required'],
                'user_ids' => ['required'],
            ]
        );
        try {
            DB::beginTransaction();

            $department_id = Department::where('department', $request['department'])->get('id')->first()->id;
            $course = Course::findOrFail($id);

            $course->update(
                [
                    'course' => $request->course,
                    'department_id' => $department_id,
                ]
            );

            $user_ids = array_filter(explode(',', $request['user_ids']));
            $current_users = CourseUser::where('course_id', $course->id)->pluck('user_id');

            $deleted_users = array_values(array_diff($current_users->toArray(), $user_ids));
            $added_users = array_values(array_diff($user_ids, $current_users->toArray()));

            $course->user()->detach($deleted_users);
            $course->user()->attach($added_users);

            DB::commit();

            return response()->json(
                [
                    'message' => 'Class updated!'
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
        $class = Course::findOrFail($id);
        $class->delete();

        return response()->json(
            [
                'message' => 'Class deleted!',
            ]
        );
    }
}
