import { ChangeEvent, FC, useState } from "react";
import useFirebase from "../../hooks/useFirebase";
import { IUser } from "../../interfaces/interfaces";
import * as yup from "yup";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/config";
import { FileDropArea, FileInput, FileMessage } from "../Input/Input.styles";


interface IProps {
  user: IUser;
}

const MAX_FILE_SIZE = 5242880; //5MB
const validFileExtensions = [
  "jpg",
  "gif",
  "png",
  "jpeg",
  "svg",
  "webp",
  "bmp",
  "heif",
  "heic",
];

const isValidFileType = (fileName: string, fileType: string) => {
  const extension = fileName.split(".").pop();
  return (
    validFileExtensions.includes(extension || "") &&
    fileType.startsWith("image/")
  );
};

const schema = yup.object().shape({
  photo: yup
    .mixed()
    .required("Photo is required")
    .test(
      "is-valid-type",
      "Not a valid image type",
      (value) => value && isValidFileType(value.name, value.type)
    )
    .test(
      "is-valid-size",
      `Max allowed size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
      (value) => value && value.size <= MAX_FILE_SIZE
    ),
});

const ChangeAvatar: FC<IProps> = ({ user }) => {
  const { updateAvatar } = useFirebase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setError(null);

    const file = e.target.files?.[0];
    if (!file) return;

    const response = await schema.validate({ photo: file }).catch((err) => {
      setError(err.errors[0]);
      setLoading(false);
    })
    if (!response) return;

    const postsColl = collection(db, "posts");
    const querySnapshot = await getDocs(postsColl).catch(() => {
      setError("Error getting documents");
      setLoading(false);
    });
    if (!querySnapshot) return;

    const url = await updateAvatar(file, user.uid)
    .catch(() => {
      setError("Error updating avatar");
      setLoading(false);
    });
    if (!url) return;

    querySnapshot.forEach( async (document) => {
      if (document.data().userId === user.uid) {
        const postId = document.id;
        const docRef = doc(db, "posts", postId);
        await updateDoc(docRef, { userPhoto: url});
      }
    });

    setLoading(false);
  };

  return (
      <FileDropArea>
        <FileMessage $isError={error ? true : false} >{error ? error : "Drag and drop to change"}</FileMessage>
        <FileInput disabled={loading} placeholder="a" type="file" name="avatar" onChange={handleChange} />
      </FileDropArea>
  );
};

export default ChangeAvatar;
