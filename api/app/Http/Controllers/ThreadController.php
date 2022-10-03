<?php

namespace App\Http\Controllers;

use App\Models\Thread;
use Illuminate\Http\Request;

class ThreadController extends Controller
{
    //
    public function fetchThread(Request $request, $id) 
    {
        $thread = Thread::where('announcement_id', $id)->get();

        return response()->json($thread);
    }
}
