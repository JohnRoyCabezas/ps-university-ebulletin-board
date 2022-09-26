<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            [
                'role' => 'student'
            ],
            [
                'role' => 'admin'
            ],
            [
                'role' => 'student_body'
            ]
        ]);

        DB::table('permissions')->insert([
            [
                'permission' => 'canReadOnly'
            ],
            [
                'permission' => 'canCreateChat'
            ],
            [
                'permission' => 'canUpdateChat'
            ],
            [
                'permission' => 'canDeleteChat'
            ],
            [
                'permission' => 'canCreateClass'
            ],
            [
                'permission' => 'canReadClass'
            ],
            [
                'permission' => 'canUpdateClass'
            ],
            [
                'permission' => 'canDeleteClass'
            ],
            [
                'permission' => 'canCreateAnnouncement'
            ],
            [
                'permission' => 'canReadAnnouncement'
            ],
            [
                'permission' => 'canUpdateAnnouncement'
            ],
            [
                'permission' => 'canDeleteAnnouncement'
            ],
            [
                'permission' => 'canCreateDepartment'
            ],
            [
                'permission' => 'canReadDepartment'
            ],
            [
                'permission' => 'canUpdateDepartment'
            ],
            [
                'permission' => 'canDeleteDepartment'
            ],
            [
                'permission' => 'canCreateThread'
            ],
            [
                'permission' => 'canReadThread'
            ],
            [
                'permission' => 'canUpdateThread'
            ],
            [
                'permission' => 'canDeleteThread'
            ],
            [
                'permission' => 'canCreateFile'
            ],
            [
                'permission' => 'canReadFile'
            ],
            [
                'permission' => 'canUpdateFile'
            ],
            [
                'permission' => 'canDeleteFile'
            ],
        ]);

        DB::table('permission_roles')->insert([
            [
                'role_id' => 1,
                'permission_id' => 1
            ],
            [
                'role_id' => 1,
                'permission_id' => 2
            ],
            [
                'role_id' => 1,
                'permission_id' => 3
            ],
            [
                'role_id' => 1,
                'permission_id' => 4
            ],
            [
                'role_id' => 2,
                'permission_id' => 2
            ],
            [
                'role_id' => 2,
                'permission_id' => 3
            ],
            [
                'role_id' => 2,
                'permission_id' => 4
            ],
            [
                'role_id' => 2,
                'permission_id' => 5
            ],
            [
                'role_id' => 2,
                'permission_id' => 6
            ],
            [
                'role_id' => 2,
                'permission_id' => 7
            ],
            [
                'role_id' => 2,
                'permission_id' => 8
            ],
            [
                'role_id' => 2,
                'permission_id' => 9
            ],
            [
                'role_id' => 2,
                'permission_id' => 10
            ],
            [
                'role_id' => 2,
                'permission_id' => 11
            ],
            [
                'role_id' => 2,
                'permission_id' => 12
            ],
            [
                'role_id' => 2,
                'permission_id' => 13
            ],
            [
                'role_id' => 2,
                'permission_id' => 14
            ],
            [
                'role_id' => 2,
                'permission_id' => 15
            ],
            [
                'role_id' => 2,
                'permission_id' => 16
            ],
            [
                'role_id' => 2,
                'permission_id' => 17
            ],
            [
                'role_id' => 2,
                'permission_id' => 18
            ],
            [
                'role_id' => 2,
                'permission_id' => 19
            ],
            [
                'role_id' => 2,
                'permission_id' => 20
            ],
            [
                'role_id' => 2,
                'permission_id' => 21
            ],
            [
                'role_id' => 2,
                'permission_id' => 22
            ],
            [
                'role_id' => 2,
                'permission_id' => 23
            ],
            [
                'role_id' => 2,
                'permission_id' => 24
            ],
        ]);

        DB::table('colleges')->insert([
            ['college' => 'Engineering'], ['college' => 'Business'], ['college' => 'Computer Science']
        ]);
        DB::table('departments')->insert([
            ['college_id' => 1, 'department' => 'Electrical Engineering'],
            ['college_id' => 1, 'department' => 'Mechanical Engineering'],
            ['college_id' => 1, 'department' => 'Computer Engineering'],
            ['college_id' => 2, 'department' => 'Accountancy'],
            ['college_id' => 2, 'department' => 'Business Administration'],
            ['college_id' => 3, 'department' => 'Information Technology'],
            ['college_id' => 3, 'department' => 'Data Science'],

        ]);

        DB::table('courses')->insert([
            [
                'department_id' => 1,
                'course' => 'Electrical Wiring 101'
            ], [
                'department_id' => 1,
                'course' => 'Fundamentals of Electrical Current 203'
            ],
            [
                'department' => 3,
                'course' => 'Computer Science 102'
            ],  [
                'department' => 6,
                'course' => 'Infotech 102'
            ], [
                'department' => 7,
                'course' => 'Data Entry 101'
            ],
        ]);
    }
}
