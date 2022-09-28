<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
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
    Route::post('/auth/logout', [AuthController::class, 'logout']);
});
