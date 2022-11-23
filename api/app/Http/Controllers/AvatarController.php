<?php

namespace App\Http\Controllers;

use App\Models\Avatar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AvatarController extends Controller
{
    //
    public function upload(Request $request)
    {
        $request->validate([
            'avatar' => '',
            'avatar.*' => ['', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ]);

        $filename = Str::random(32).'.'.$request->avatar->getClientOriginalExtension();
        $request->avatar->move('Avatars/', $filename);

        return response()->json($filename);
    }
}
