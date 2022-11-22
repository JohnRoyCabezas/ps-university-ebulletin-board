<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseUser;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
                'course' => ['required'],
                'department_id' => ['required'],
                'user_ids' => ['required'],
                'instructor_id' => ['required'],
                'class_information' => ['max:1000']
            ]);

        try {
            DB::beginTransaction();

            $course = Course::create([
                    'department_id' => $validatedData['department_id'],
                    'course' => $validatedData['course'],
                    'class_information' => $validatedData['class_information']
                ]);

            $course->user()->attach($validatedData['user_ids']);
            $course->user()->attach($validatedData['instructor_id']);

            DB::commit();

            return response()->json([
                'message' => 'Class created!',
            ]);

        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        $course = Course::find($id);

        $instructor = CourseUser::with('user')->where('course_id', $id)->whereHas('user', function($query){
            $query->whereHas('roleUser', function ($query) {
                $query->where('role_id', '=', 5);
            });
        })->get()->first();

        $students = CourseUser::with('user.department')->where('course_id', $id)->whereHas('user', function($query){
            $query->whereHas('roleUser', function ($query) {
                $query->where('role_id', '=', 1);
            });
        })->get();

        $course->instructor = $instructor;
        $course->students = $students;

        return response()->json($course);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'course' => ['required'],
            'department_id' => ['required'],
            'instructor_id' => ['required'],
            'user_ids' => ['required'],
            'old_instructor_id' => ['required'],
            'old_user_ids' => ['required'],
        ]);

        try {
            DB::beginTransaction();

            $course = Course::find($id);

            if($validatedData['instructor_id']!=$validatedData['old_instructor_id']) {
                $course->user()->detach($validatedData['old_instructor_id']);
                $course->user()->attach($validatedData['instructor_id']);
            }

            if($validatedData['user_ids']!=$validatedData['old_user_ids']) {
                $course->user()->detach($validatedData['old_user_ids']);
                $course->user()->attach($validatedData['user_ids']);
            }

            $course->update([
                'department_id' => $validatedData['department_id'],
                'course' => $validatedData['course'],
            ]);


            DB::commit();

            return response()->json([
                'message' => 'Class Updated!',
            ]);

        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(Request $request, $id)
    {
        $validatedData = $request->validate([
            'old_user_ids' => ['required'],
            'old_instructor_id' => ['required'],
        ]);

    try {
        DB::beginTransaction();

        $course = Course::find($id);

        $course->user()->detach($validatedData['old_user_ids']);
        $course->user()->detach($validatedData['old_instructor_id']);

        Course::destroy($id);
        DB::commit();

        return response()->json([
            'message' => 'Class deleted!',
        ]);

    } catch (Exception $e) {
        DB::rollBack();

        return response()->json([
            'message' => $e->getMessage(),
        ], 500);
    }
    }
}
