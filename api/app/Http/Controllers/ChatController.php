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
        ]);

        event(new ChatUpdate($chat->id));

        return response()->json(['message' => 'Chat created!'], 200);
    }

    public function show($id)
    {
        $chat = Chat::with('user', 'comments.user')->find($id);

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

    public function courseChats( Request $request)
    {
        $coursechats = Chat::with('comments.user')->where('course_id', $request->course_id)
            ->with('user')->orderBy('created_at')->get();
            
        return response()->json($coursechats);
    }
}
