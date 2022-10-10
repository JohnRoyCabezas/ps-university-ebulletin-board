<?php

namespace App\Http\Controllers;

use App\Models\Thread;
use Illuminate\Http\Request;

class ThreadController extends Controller
{
    //
    public function fetchAllThreads() 
    {
        $threads = Thread::all();

        return response()->json($threads);
    }

    public function fetchThread($id) 
    {
        $thread = Thread::where('announcement_id', $id)->get();

        return response()->json($thread);
    }
}
