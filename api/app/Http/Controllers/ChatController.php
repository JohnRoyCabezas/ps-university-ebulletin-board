<?php

namespace App\Http\Controllers;

use App\Events\ChatUpdate;
use App\Events\CommentUpdate;
use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function index()
    {
        $chats = Chat::all();

        return response()->json($chats);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $validatedData = $request->validate([
            'course_id' => 'required',
            'chat' => 'required',
        ]);

        $chat = Chat::create(
            [
                'course_id' => $validatedData['course_id'],
                'user_id' => $user->id,
                'chat' => $validatedData['chat']
            ]
        );
        if ($request->hasFile('data')) {
            $chat->addMedia($request->data)->toMediaCollection('file');
        }
        if ($request->hasFile('data1')) {
            $chat->addMedia($request->data1)->toMediaCollection('file1');
        }
        if ($request->hasFile('data2')) {
            $chat->addMedia($request->data2)->toMediaCollection('file2');
        }
        if ($request->hasFile('data3')) {
            $chat->addMedia($request->data3)->toMediaCollection('file3');
        }
        if ($request->hasFile('data4')) {
            $chat->addMedia($request->data4)->toMediaCollection('file4');
        }

        event(new ChatUpdate($chat->id));

        return response()->json(['message' => 'Chat created!'], 200);
    }

    public function show($id)
    {
        $chat = Chat::with(['user', 'comments.user', 'comments.media'])->find($id);

        return response()->json($chat);
    }

    public function update(Request $request, $id)
    {
        $chat = Chat::find($id);

        $validatedData = $request->validate([
            'chat' => 'required'
        ]);

        $chat->update(['chat' => $validatedData['chat']]);

        event(new ChatUpdate($id));

        return response()->json(['message' => 'Updated chat message!']);
    }

    public function destroy($id)
    {
        $chat = Chat::find($id);
        event(new ChatUpdate($id));

        $chat->delete();


        return response()->json(['message' => 'Soft deleted a chat message!']);
    }

    public function courseChats(Request $request)
    {
        $coursechats = Chat::with(['comments.user', 'comments.media'])->where('course_id', $request->course_id)
            ->with(['user', 'media'])->orderBy('created_at')->get();

        return response()->json($coursechats);
    }
}
