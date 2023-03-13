import { updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../config/config";
import { IPost } from "../interfaces/interfaces";
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
    return await getDownloadURL(storageRef);
  };

  const uploadDoc = async (destination: string, data: IPost) => {
    const dbRef = collection(db, destination);
    await addDoc(dbRef, data);
  };

  return { updateAvatar, uploadFile, uploadDoc };
};

export default useUploadFile;
