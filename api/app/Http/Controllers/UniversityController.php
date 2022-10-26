<?php

namespace App\Http\Controllers;

use App\Models\University;
use Illuminate\Http\Request;

class UniversityController extends Controller
{
    public function store(Request $request) 
    {
        $validatedData = $request->validate([
                'user_id' => ['required'],
                'university' => ['required', 'unique:universities'],
            ]
        );

        $newUniversity = University::create([
            'user_id' => $validatedData['user_id'],
            'university' => $validatedData['university'],
        ]);

        return response()->json([
                'Message' => 'University created',
                'data' => $newUniversity,
            ]
        );
    }
}
