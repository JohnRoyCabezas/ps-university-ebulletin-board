<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Thread;
use Illuminate\Http\Request;

class ThreadController extends Controller
{
    // All Thread
    public function fetchAllThreads()
    {
        $threads = Thread::all();

        return response()->json($threads);
    }
    // Fetch specific Announcement with its Thread
    public function fetchThread($id)
    {
        $announcement = Announcement::with('Thread')->findOrFail($id);

        return response()->json($announcement);
    }
    // Create a thread
    public function createThread(Request $request)
    {
        $request->validate(
            [
                'user_id' => ['required'],
                'announcement_id' => ['required'],
                'thread_message' => ['required'],
            ]
        );

        Thread::create($request->all());

        return response()->json(
            [
                'Message' => 'Thread added',
            ]
        );
    }
    // Update specific message in the thread
    public function updateThread(Request $request, $id)
    {
        $request->validate(
            [
                'thread_message' => ['required'],
            ]
        );

        $thread = Thread::findOrFail($id);
        $thread->update($request->all());

        return response()->json(
            [
                'Message' => 'Thread message updated!',
            ]
        );

    }
    // Delete message in the thread
    public function destroy($id)
    {
        Thread::destroy($id);

        return response()->json(
            [
                'Message' => 'Thread deleted!',
            ]
        );
    }
}
