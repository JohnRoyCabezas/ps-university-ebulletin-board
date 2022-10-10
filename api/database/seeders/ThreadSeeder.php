<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ThreadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('threads')->insert([
            [
                'user_id' => 2,
                'announcement_id' => '1',
                'thread_message' => 'yeheyy!' 

            ], 
            [
                'user_id' => 2,
                'announcement_id' => '1',
                'thread_message' => 'relax timee!'
            ], 
            [
                'user_id' => 2,
                'announcement_id' => '1',
                'thread_message' => 'oh no!'
            ], 
        ]);
    }
}
