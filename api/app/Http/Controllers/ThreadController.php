<?php

namespace App\Http\Controllers;

use App\Events\ThreadUpdate;
use App\Models\Announcement;
use App\Models\Thread;
use FFI\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        try {
            DB::beginTransaction();
            $announcement = Announcement::with('user')->findOrFail($id);
            $thread = Thread::with('user')->where('announcement_id', $id)->oldest()->get();

            DB::commit();

            return response()->json([
                'thread' => $thread,
                'announcement' => $announcement,
            ]);
        } catch (Exception $e) {
            DB::rollBack();
        }

    }
    // Fetch specific message from the thread
    public function fetchSpecificThread($id)
    {
        $thread = Thread::findOrFail($id);

        return response()->json([
            'thread' => $thread,
        ]);
    }
    // Create a thread
    public function createThread(Request $request)
    {
        $request->validate([
            'user_id' => ['required'],
            'announcement_id' => ['required'],
            'thread_message' => ['required'],
        ]);

    $thread = Thread::create($request->all());

        event(new ThreadUpdate($thread));

        return response()->json([
            'message' => 'Thread added',
        ]);
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
