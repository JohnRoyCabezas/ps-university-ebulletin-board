<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\PermissionRole;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $announcements = Announcement::all();

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
            'announcement' => 'required'
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
                'announcement' => $validatedData['announcement']
            ]);

            $data = [
                'message' => $user_fullname . ' successfully created an announcement!',
                'user' => $user_fullname,
                'announcement' => $announcement
            ];
            return response()->json($data);
        } else {
            return response()->json([
                'message' => $user_fullname . ' does not have permission to post announcement.'
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
            $announcement = Announcement::find($id);

            return response()->json($announcement);
        } else {
            return response()->json([
                'message' => $user_fullname . ' does not have permission to view announcement.'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();

        $user_fullname = $user['fullname'];
        $user_role_id = $user->roleUser->role_id;

        $validatedData = $request->validate([
            'announcement_update' => 'required'
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
                'message' => $user_fullname . ' does not have permission to update announcement.'
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
                'message' => 'Successfully deleted announcement!'
            ];
            return response()->json($data);
        } else {
            return response()->json([
                'message' => $user_fullname . ' does not have permission to delete announcement.'
            ]);
        }
    }
}
