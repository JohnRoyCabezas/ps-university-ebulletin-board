import AvatarInstance from "./FileInstance";

export const AvatarUploadApi = {
    upload: (payload) => {
        const config = {
          method: 'POST',
          url: '/avatar',
          data: payload.formData,
        }
        return AvatarInstance.request(config);
      }
}
