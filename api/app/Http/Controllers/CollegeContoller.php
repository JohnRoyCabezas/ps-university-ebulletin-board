<?php

namespace App\Http\Controllers;

use App\Models\College;
use Illuminate\Http\Request;

class CollegeContoller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $college = College::all();

        return response()->json($college);        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'university' => 'required',
            'dean' => 'required',
            'college_information' => 'required',
            'college' => 'required'
        ]);

        College::create([
            'university_id' => $validatedData['university'],
            'user_id' => $validatedData['dean'],
            'college_information' => $validatedData['college_information'],
            'college' => $validatedData['college'],
        ]);

        return response()->json(['message' => 'Successfully created college!'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
       $college = College::findOrFail($id);

       return response()->json($college);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
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
            'message' => 'Successfully updated college information!'
        ];

        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        College::destroy($id);

        return response()->json(['message' => 'College deleted!']);
    }
}
