export const combineUsersActivities = (
  userActivities,
  followingActivities = []
) => {
  const followingTemp = [];
  followingActivities.forEach((followingActivity) => {
    followingActivity.activities.flatMap((acts) => followingTemp.push(acts));
  });
  userActivities.flatMap((acts) => followingTemp.push(acts));
  return followingTemp.sort(function (a, b) {
    return new Date(b.created_at) - new Date(a.created_at);
  });
};
