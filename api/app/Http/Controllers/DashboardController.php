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
        $role_users = $user->roleUsers;

        $validatedData = $request->validate([
            'announcementable_id' => 'required',
            'announcementable_type' => 'required',
            'announcement' => 'required'
        ]);

        //checks if role_users has permission canCreateAnnouncement 
        //boolean values are set for each role the user has
        //returns object
        $role_permissions = $role_users->map(function ($item, $key) {
            return PermissionRole::where('role_id', $item->role_id)
            ->whereHas('permission', function ($query) {
                $query->where('permission', 'canCreateAnnouncement');
            })
            ->exists(); 
        });

        //converts role_permissions object to array
        $canCreateAnnouncementBoolean = in_array('true', $role_permissions->toArray());
        
        //checks if user with role(s) has canCreateAnnouncement permission
        if ($canCreateAnnouncementBoolean) {
            $announcement = Announcement::create([
                'announcementable_id' => $validatedData['announcementable_id'],
                'announcementable_type' => $validatedData['announcementable_type'],
                'user_id' => $user->id,
                'announcement' => $validatedData['announcement']
            ]);

            $data = [
                'message' => 'Successfully created an announcement!',
                'user' => $user_fullname,
                'announcement' => $announcement
            ];
            return response()->json($data);

        } else {
            return response()->json([
                'message' => $user_fullname . ' does not have permission to post announcement.'
            ]);
        }
    }

    public function show($id) 
    {
        $user = Auth::user();
        
        $user_fullname = $user['fullname'];
        $role_users = $user->roleUsers;

        //checks if role_users has permission canReadAnnouncement 
        $role_permissions = $role_users->map(function ($item, $key) {
            return PermissionRole::where('role_id', $item->role_id)
            ->whereHas('permission', function ($query) {
                $query->where('permission', 'canReadAnnouncement');
            })
            ->exists(); 
        });

        $canReadAnnouncementBoolean = in_array('true', $role_permissions->toArray());

        if ($canReadAnnouncementBoolean) {
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
        $role_users = $user->roleUsers;

        $validatedData = $request->validate([
            // 'announcement_id' => 'required',
            'announcement_update' => 'required'
        ]);

        //checks if role_users has permission canUpdateAnnouncement 
        $role_permissions = $role_users->map(function ($item, $key) {
            return PermissionRole::where('role_id', $item->role_id)
            ->whereHas('permission', function ($query) {
                $query->where('permission', 'canUpdateAnnouncement');
            })
            ->exists(); 
        });

        //converts role_permissions object to array
        $canUpdateAnnouncementBoolean = in_array('true', $role_permissions->toArray());
        
        //checks if user with role(s) has canCreateAnnouncement permission
        if ($canUpdateAnnouncementBoolean) {
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
        $role_users = $user->roleUsers;

        //checks if role_users has permission canDeleteAnnouncement 
        $role_permissions = $role_users->map(function ($item, $key) {
            return PermissionRole::where('role_id', $item->role_id)
            ->whereHas('permission', function ($query) {
                $query->where('permission', 'canDeleteAnnouncement');
            })
            ->exists(); 
        });

        //converts role_permissions object to array
        $canDeleteAnnouncementBoolean = in_array('true', $role_permissions->toArray());
        
        //checks if user with role(s) has canDeleteAnnouncement permission
        if ($canDeleteAnnouncementBoolean) {
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
