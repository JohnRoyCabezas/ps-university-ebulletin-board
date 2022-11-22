<?php

namespace App\Http\Controllers;

use App\Events\AnnouncementUpdate;
use App\Events\ThreadUpdate;
use App\Models\Announcement;
use App\Models\PermissionRole;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Twilio\Rest\Client;


class AnnouncementController extends Controller
{
    public function index(Request $request)
    {
        $announcements = Announcement::with('user')->get();

        return response()->json($announcements);
    }

    public function channelAnnouncements(Request $request)
    {
        $announcements = Announcement::with(['user', 'media'])->channel($request)->orderBy('created_at')->get();

        return response()->json($announcements);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $user_fullname = $user['fullname'];
        $user_role_id = $user->roleUser->role_id;

        $validatedData = $request->validate([
            'announcementable_id' => 'required',
            'announcementable_type' => 'required',
            'announcement' => 'required',
        ]);
        $canCreateAnnouncement = PermissionRole::where('role_id', $user_role_id)
            ->whereHas('permission', function ($query) {
                $query->where('permission', 'canCreateAnnouncement');
            })->exists();

        if ($canCreateAnnouncement) {
            $announcement = Announcement::create([
                'announcementable_id' => $validatedData['announcementable_id'],
                'announcementable_type' => $validatedData['announcementable_type'],
                'user_id' => $user->id,
                'announcement' => $validatedData['announcement'],
            ]);
            if ($request->hasFile('data')) {
                $announcement->addMedia($request->data)->toMediaCollection('file');
            }
            if ($request->hasFile('data1')) {
                $announcement->addMedia($request->data1)->toMediaCollection('file1');
            }
            if ($request->hasFile('data2')) {
                $announcement->addMedia($request->data2)->toMediaCollection('file2');
            }
            if ($request->hasFile('data3')) {
                $announcement->addMedia($request->data3)->toMediaCollection('file3');
            }
            if ($request->hasFile('data4')) {
                $announcement->addMedia($request->data4)->toMediaCollection('file4');
            }
            event(new AnnouncementUpdate($announcement));
            $data = [
                'message' => $user_fullname . ' successfully created an announcement!',
                'user' => $user_fullname,
                'announcement' => $announcement,
            ];

            // $mobile_numbers = User::whereNotNull("mobile_number")->pluck('mobile_number');

            // $sid = env('TWILIO_SID');
            // $token = env('TWILIO_TOKEN');
            // $messageService = env('TWILIO_MESSAGING_SERVICE_SID');

            // foreach ($mobile_numbers as $mobile_number) {
            //     $twilio = new Client($sid, $token);
            //     $twilio->messages
            //         ->create($mobile_number, // to
            //             [
            //                 "body" => strip_tags($announcement->announcement),
            //                 "messagingServiceSid" => $messageService,
            //             ]
            //         );
            // }
            return response()->json($data);
        } else {
            return response()->json([
                'message' => $user_fullname . ' does not have permission to post announcement.',
            ]);
        }

        return response()->json($canCreateAnnouncement);
    }

    public function show($id)
    {
        $user = Auth::user();

        $user_fullname = $user['fullname'];
        $user_role_id = $user->roleUser->role_id;

        //checks if role_user has permission canReadAnnouncement
        $canReadAnnouncement = PermissionRole::where('role_id', $user_role_id)
            ->whereHas('permission', function ($query) {
                $query->where('permission', 'canReadAnnouncement');
            })->exists();

        if ($canReadAnnouncement) {
            $announcement = Announcement::with('media')->find($id);

            return response()->json($announcement);
        } else {
            return response()->json([
                'message' => $user_fullname . ' does not have permission to view announcement.',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();

        $user_fullname = $user['fullname'];
        $user_role_id = $user->roleUser->role_id;

        $validatedData = $request->validate([
            'announcement_update' => 'required',
        ]);

        //checks if role_user has permission canUpdateAnnouncement
        $canUpdateAnnouncement = PermissionRole::where('role_id', $user_role_id)
            ->whereHas('permission', function ($query) {
                $query->where('permission', 'canUpdateAnnouncement');
            })->exists();

        //checks if user with role has canCreateAnnouncement permission
        if ($canUpdateAnnouncement) {
            $announcement_update = Announcement::find($id)
                ->update(['announcement' => $validatedData['announcement_update']]);

            $data = [
                'message' => 'Successfully updated announcement!',
                'user' => $user_fullname,
                'announcement_update' => $announcement_update,
            ];

            return response()->json($data);
        } else {
            return response()->json([
                'message' => $user_fullname . ' does not have permission to update announcement.',
            ]);
        }
    }

    public function destroy($id)
    {
        $user = Auth::user();

        $user_fullname = $user['fullname'];
        $user_role_id = $user->roleUser->role_id;

        //checks if role_user has permission canDeleteAnnouncement
        $canDeleteAnnouncement = PermissionRole::where('role_id', $user_role_id)
            ->whereHas('permission', function ($query) {
                $query->where('permission', 'canDeleteAnnouncement');
            })->exists();

        //checks if user with role has canDeleteAnnouncement permission
        if ($canDeleteAnnouncement) {
            Announcement::destroy($id);

            $data = [
                'message' => 'Successfully deleted announcement!',
            ];

            return response()->json($data);
        } else {
            return response()->json([
                'message' => $user_fullname . ' does not have permission to delete announcement.',
            ]);
        }
    }

    public function lock(Request $request, $id)
    {
        $user = Auth::user();

        $user_fullname = $user['fullname'];
        $user_role_id = $user->roleUser->role_id;

        //checks if role_user has permission canUpdateAnnouncement
        $canUpdateAnnouncement = PermissionRole::where('role_id', $user_role_id)
            ->whereHas('permission', function ($query) {
                $query->where('permission', 'canUpdateAnnouncement');
            })->exists();

        //checks if user with role has canCreateAnnouncement permission
        if ($canUpdateAnnouncement) {
            $announcement = Announcement::find($id);
            $thread = $announcement->update(['is_locked' => !$announcement['is_locked']]);

            event(new ThreadUpdate($thread));
            $data = [
                'message' => "Successfully" . ($announcement['is_locked'] ? " locked " : " unlocked ") . "announcement!",
                'user' => $user_fullname,
            ];
            return response()->json($data);
        } else {
            return response()->json([
                'message' => $user_fullname . ' does not have permission to update announcement.',
            ]);
        }
    }
}
