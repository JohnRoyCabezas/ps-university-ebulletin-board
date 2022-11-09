<?php

namespace App\Http\Controllers;

use App\Models\College;
use App\Models\University;
use App\Models\RoleUser;
use Illuminate\Http\Request;

class CollegeController extends Controller
{
    public function index(Request $request)
    {
        //
        $college = College::where('university_id', $request->university_id)->get();

        return response()->json($college);
    }

    public function store(Request $request)
    {
        //
        $validatedData = $request->validate([
            'user_id' => 'required',
            'dean' => 'required',
            'college_information' => 'required',
            'college' => 'required',
        ]);
        
        $universityid = University::where('user_id', $validatedData['user_id'])->value('id');

        College::create([
            'university_id' => $universityid,
            'user_id' => $validatedData['dean'],
            'college_information' => $validatedData['college_information'],
            'college' => $validatedData['college'],
        ]);

        return response()->json(['message' => 'Successfully created college!'], 200);
    }

    public function show($id)
    {
        //
        $college = College::findOrFail($id);
        $deans = RoleUser::with('user')->dean()->get();

        return response()->json(
            [
                'college' => $college,
                'deans' => $deans,
            ]
        );
    }

    public function update(Request $request, $id)
    {
        //
        $validatedData = $request->validate([
            'college' => 'required',
            'college_information' => 'required',
            'dean' => 'required',
        ]);

        College::findOrFail($id)->update([
            'college' => $validatedData['college'],
            'college_information' => $validatedData['college_information'],
            'user_id' => $validatedData['dean'],
        ]);

        $data = [
            'message' => 'Successfully updated college information!',
        ];

        return response()->json($data);
    }

    public function destroy($id)
    {
        //
        College::destroy($id);

        return response()->json(['message' => 'College deleted!']);
    }
}
