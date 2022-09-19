export const checkUserExistence = (users, user_id) => {
  return users.find((user) => {
    return user.id === user_id;
  });
};
