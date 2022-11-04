<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChangepasswordController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\CollegeController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UniversityController;
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
Route::apiResource('/university', UniversityController::class);

// Private
Route::middleware('auth:sanctum', 'throttle:100,1')->group(function () {
    Route::apiResource('/chat', ChatController::class);
    Route::apiResource('/auth', AuthController::class);
    Route::apiResource('/role', RoleController::class);
    Route::apiResource('/course', CourseController::class);
    Route::apiResource('/college', CollegeController::class);
    Route::apiResource('/department', DepartmentController::class);
    Route::apiResource('/announcement', AnnouncementController::class);
    Route::apiResource('/comment', CommentController::class);
    Route::get('/chat-comments', [CommentController::class, 'chatComments']);

    Route::prefix('thread')->group(function () {
        Route::get('/{id}', [ThreadController::class, 'fetchThread']);
        Route::post('/add', [ThreadController::class, 'createThread']);
        Route::get('/all', [ThreadController::class, 'fetchAllThreads']);
        Route::delete('/destroy/{id}', [ThreadController::class, 'destroy']);
        Route::put('/update/{id}', [ThreadController::class, 'updateThread']);
    });

    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'getUsers']);
        Route::get('/deans', [UserController::class, 'getDeans']);
        Route::get('/user', [UserController::class, 'getAuthUser']);
        Route::get('/students', [UserController::class, 'getStudents']);
        Route::get('/instructors', [UserController::class, 'getInstructors']);
    });

    Route::prefix('announcements')->group(function () {
        Route::get('/', [AnnouncementController::class, 'channelAnnouncements']);
        Route::put('/announcement/{id}/lock', [AnnouncementController::class, 'lock']);
    });

    Route::put('/changepassword', [ChangepasswordController::class, 'ChangePassword']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/course-chats', [ChatController::class, 'courseChats']);
});
