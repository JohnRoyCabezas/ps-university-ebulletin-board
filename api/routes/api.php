<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CollegeController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

// Public
Route::post('/auth/login', [AuthController::class, 'login']);

// Private
Route::middleware('auth:sanctum', 'throttle:100,1')->group(function () {
    Route::apiResource('/auth', AuthController::class);
    Route::apiResource('/role', RoleController::class);
    Route::apiResource('/department', DepartmentController::class);
    Route::apiResource('/announcement', AnnouncementController::class);
    Route::get('/announcements', [AnnouncementController::class, 'channelAnnouncements']);
    Route::apiResource('/college', CollegeController::class);
    Route::apiResource('/course', CourseController::class);
    Route::prefix('thread')->group(function () {
        Route::get('/all', [ThreadController::class, 'fetchAllThreads']);
        Route::get('/{id}', [ThreadController::class, 'fetchThread']);
    });
    Route::get('/user', [UserController::class, 'getAuthUser']);
    Route::get('/users', [UserController::class, 'getUsers']);
    Route::get('/users/deans', [UserController::class, 'getDeans']);
    Route::get('/users/students', [UserController::class, 'getStudents']);
    Route::get('/users/instructors', [UserController::class, 'getInstructors']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
});
