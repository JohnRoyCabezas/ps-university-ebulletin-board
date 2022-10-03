<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\RoleController;
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
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/auth', AuthController::class);
    Route::apiResource('/role', RoleController::class);
    Route::apiResource('/department', DepartmentController::class);
    Route::apiResource('/announcement', AnnouncementController::class);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
});
