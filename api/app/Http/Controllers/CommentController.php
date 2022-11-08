<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        $data = [
            'message' => 'Successfully created a comment!',
            'comment' => $comment
        ];

        return response()->json($data);
    }

    public function show($id)
    {
        $comment = Comment::findOrFail($id);

        return response()->json($comment);
    }

    public function update(Request $request, $id)
    {
        $comment = Comment::find($id);

        $validatedData = $request->validate([
            'comment' => 'required'
        ]);

        $comment->update(['comment' => $validatedData['comment']]);

        return response()->json(['message' => 'Updated comment!']);
    }

    public function destroy($id)
    {
        $comment = Comment::find($id);

        $comment->delete();
        return response()->json(['message' => 'Soft deleted a comment!']);
    }

    public function chatComments(Request $request)
    {
        $chatComments = Comment::with('user.roleUser')->where('chat_id', $request->chat_id)->get();

        return response()->json($chatComments);
    }
}
