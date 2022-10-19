<?php

namespace App\Http\Controllers;

use App\Models\College;
use App\Models\RoleUser;
use Illuminate\Http\Request;

class CollegeController extends Controller
{
    public function index()
    {
        //
        $college = College::all();

        return response()->json($college);
    }

    public function store(Request $request)
    {
        //
        $validatedData = $request->validate([
            'university' => 'required',
            'dean' => 'required',
            'college_information' => 'required',
            'college' => 'required',
        ]);

        College::create([
            'university_id' => $validatedData['university'],
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
