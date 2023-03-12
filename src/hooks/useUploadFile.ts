import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../config/config";
import { avatarChange } from "../state/features/auth/authSlice";
import { useAppDispatch } from "../state/store";

const useUploadFile = () => {
  const dispatch = useAppDispatch();

  const updateAvatar = async (photo: File, userId: string) => {
    if (!photo) return;
    const url = await uploadFile(photo, userId);
    await updateProfile(auth.currentUser!, {
      photoURL: url,
    });
    dispatch(avatarChange(url));
  };

  const uploadFile = async (photo: File, userId: string) => {
    const storageRef = ref(storage, `${userId}/${photo.name}`);
    await uploadBytes(storageRef, photo);
    return await getDownloadURL(storageRef);;
    };

  return { updateAvatar, uploadFile };
};

export default useUploadFile;
