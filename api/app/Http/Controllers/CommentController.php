<?php

namespace App\Http\Controllers;

use App\Events\ChatUpdate;
use App\Events\CommentUpdate;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    public function index()
    {
        $allcomments = Comment::all();

        return response()->json($allcomments);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $validatedData = $request->validate([
            'chat_id' => 'required',
            'comment' => 'required',
        ]);

        $comment = Comment::create([
            'user_id' => $user->id,
            'chat_id' => $validatedData['chat_id'],
            'comment' => $validatedData['comment']
        ]);
        if ($request->hasFile('data')) {
            $comment->addMedia($request->data)->toMediaCollection('file');
        }
        if ($request->hasFile('data1')) {
            $comment->addMedia($request->data1)->toMediaCollection('file1');
        }
        if ($request->hasFile('data2')) {
            $comment->addMedia($request->data2)->toMediaCollection('file2');
        }
        if ($request->hasFile('data3')) {
            $comment->addMedia($request->data3)->toMediaCollection('file3');
        }
        if ($request->hasFile('data4')) {
            $comment->addMedia($request->data4)->toMediaCollection('file4');
        }
        event(new CommentUpdate($comment));
        event(new ChatUpdate($comment->chat_id));

        $data = [
            'message' => 'Successfully created a comment!',
            'comment' => $comment
        ];

        return response()->json($data);
    }

    public function show($id)
    {
        $comment = Comment::with('media')->findOrFail($id);

        return response()->json($comment);
    }

    public function update(Request $request, $id)
    {
        $comment = Comment::find($id);

        $validatedData = $request->validate([
            'comment' => 'required'
        ]);

        $comment->update(['comment' => $validatedData['comment']]);

        event(new CommentUpdate($comment));

        return response()->json(['message' => 'Updated comment!']);
    }

    public function destroy($id)
    {
        $comment = Comment::find($id);

        event(new CommentUpdate($comment));
        event(new ChatUpdate($comment->chat_id));

        $comment->delete();

        return response()->json(['message' => 'Soft deleted a comment!']);
    }

    public function chatComments(Request $request)
    {
        $chatComments = Comment::with(['user.roleUser', 'media'])->where('chat_id', $request->chat_id)->get();

        return response()->json($chatComments);
    }
}
