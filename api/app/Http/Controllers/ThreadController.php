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
            $announcement = Announcement::with(['user', 'media'])->findOrFail($id);
            $thread = Thread::with(['user', 'media'])->where('announcement_id', $id)->oldest()->get();

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
        $thread = Thread::create([
            'announcement_id' => $request->announcement_id,
            'user_id' => $request->user_id,
            'thread_message' => $request->thread_message,
        ]);
        if ($request->hasFile('data')) {
            $thread->addMedia($request->data)->toMediaCollection('file');
        }
        if ($request->hasFile('data1')) {
            $thread->addMedia($request->data1)->toMediaCollection('file1');
        }
        if ($request->hasFile('data2')) {
            $thread->addMedia($request->data2)->toMediaCollection('file2');
        }
        if ($request->hasFile('data3')) {
            $thread->addMedia($request->data3)->toMediaCollection('file3');
        }
        if ($request->hasFile('data4')) {
            $thread->addMedia($request->data4)->toMediaCollection('file4');
        }
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
