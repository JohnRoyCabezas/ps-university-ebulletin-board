<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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
                'role' => 'Student'
            ],
            [
                'role' => 'Admin'
            ],
            [
                'role' => 'Student Body'
            ],
            [
                'role' => 'Dean'
            ],
            [
                'role' => 'Instructor'
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
            [
                'permission' => 'canCreateCollege'
            ],
            [
                'permission' => 'canReadCollege'
            ],
            [
                'permission' => 'canUpdateCollege'
            ],
            [
                'permission' => 'canDeleteCollege'
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
                'role_id' => 1,
                'permission_id' => 10
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
            [
                'role_id' => 4,
                'permission_id' => 25
            ],
            [
                'role_id' => 4,
                'permission_id' => 26
            ],
            [
                'role_id' => 4,
                'permission_id' => 27
            ],
            [
                'role_id' => 4,
                'permission_id' => 28
            ],
        ]);
        DB::table('users')->insert([
            [
                'fullname' => 'admin',
                'password' => Hash::make('password'),
                'email' => 'admin@ebulletin.com',
                'avatar' => 'https://joeschmoe.io/api/v1/1',
                'department_id' => null,
                'is_verified' => false
            ],
        ]);
        DB::table('universities')->insert([
            [
                'university' => 'Sun* University',
                'user_id' => '1'
            ],
        ]);
        DB::table('colleges')->insert([
            [
                'university_id' => 1,
                'college' => 'Engineering',
            ],
            [
                'university_id' => 1,
                'college' => 'Business'
            ],
            [
                'university_id' => 1,
                'college' => 'Computer Science'
            ]
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
        DB::table('users')->insert([
            [
                'fullname' => 'Sample User',
                'password' => Hash::make('password'),
                'email' => 'user@ebulletin.com',
                'department_id' => 1,
                'avatar' => 'https://joeschmoe.io/api/v1/2',
                'is_verified' => false,
                'university_id' => 1,
            ],
            [
                'fullname' => 'Sample Dean 1',
                'password' => Hash::make('password'),
                'email' => 'dean1@ebulletin.com',
                'department_id' => null,
                'avatar' => 'https://joeschmoe.io/api/v1/3',
                'is_verified' => false,
                'university_id' => 1,
            ],
            [
                'fullname' => 'Sample Dean 2',
                'password' => Hash::make('password'),
                'department_id' => null,
                'email' => 'dean2@ebulletin.com',
                'avatar' => 'https://joeschmoe.io/api/v1/4',
                'is_verified' => false,
                'university_id' => 1,
            ]
        ]);

        DB::table('role_users')->insert([
            [
                'role_id' => 1,
                'user_id' => 2
            ],
            [
                'role_id' => 2,
                'user_id' => 1
            ],
            [
                'role_id' => 4,
                'user_id' => 3
            ],
            [
                'role_id' => 4,
                'user_id' => 4
            ],
        ]);

        DB::table('announcements')->insert([
            [
                'announcementable_id' => 2,
                'announcementable_type' => 'App/Models/University',
                'user_id' => 1,
                'announcement' => 'Classes are suspended on all levels due to special holiday celebration.'
            ],
            [
                'announcementable_id' => 2,
                'announcementable_type' => 'App/Models/University',
                'user_id' => 1,
                'announcement' => 'There are free food and pastries on the way for all buildings.'
            ],
            [
                'announcementable_id' => 1,
                'announcementable_type' => 'App/Models/College',
                'user_id' => 1,
                'announcement' => 'Enrollment is now going on. Please submit your documents to the Engineering college registrar office.'
            ],
            [
                'announcementable_id' => 2,
                'announcementable_type' => 'App/Models/College',
                'user_id' => 1,
                'announcement' => 'Enrollment is now going on. Please submit your documents to the Business College registrar office.'
            ],
            [
                'announcementable_id' => 3,
                'announcementable_type' => 'App/Models/Department',
                'user_id' => 1,
                'announcement' => 'Enrollment is now going on. Please submit your documents to the college registrar office.'
            ],
            [
                'announcementable_id' => 3,
                'announcementable_type' => 'App/Models/Course',
                'user_id' => 1,
                'announcement' => 'This is your CompSci instructor posting an announcement. There will be no class today for CompSci 101.'
            ],
            [
                'announcementable_id' => 3,
                'announcementable_type' => 'App/Models/Course',
                'user_id' => 1,
                'announcement' => 'This is your CompSci instructor posting an announcement. Please submit your projects to the Google Drive on or before October 31.'
            ],
        ]);
    }
}
