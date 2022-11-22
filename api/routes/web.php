<?php

use App\Events\ChatUpdate;
use App\Models\Announcement;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $id = 12;
    return Announcement::find($id)->getMedia('file')->firstOrFail();
    // return Announcement::with(['user', 'media'])->get();
    // return Announcement::find(52)->getMedia('file')->where('uuid', 'cd42ff3a-8217-4d6d-946f-abe85b213e85')->firstOrFail();
    // return view('welcome');

});
