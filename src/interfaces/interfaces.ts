export interface IData {
  data: IPost;
  id: string;
}
export interface IPost {
  title: string;
  desc: string;
  userId: string;
  photo: string;
  createdAt: string;
}

export interface IUser {
  avatar: string | undefined;
  isAuth: boolean;
  uid: string;
  email: string | null;
}