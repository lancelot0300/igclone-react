import * as yup from "yup";

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

 export const isValidFileType = (fileName: string, fileType: string) => {
    const extension = fileName.split(".").pop();
    return (
      validFileExtensions.includes(extension || "") &&
      fileType.startsWith("image/")
    );
  };

export const CreatePostSchema = yup.object({
    desc: yup.string().required("Description is required"),
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
        "File size is too large",
        (value) => value && value.size <= MAX_FILE_SIZE
      ),
  })