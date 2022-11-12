export interface IData {
  data: IPost;
  id: string;
}
export interface IPost {
  title: string;
  body: string;
  userId: string;
}

export interface IUser {
  avatar: string | undefined;
  isAuth: boolean;
  uid: string;
  email: string | null;
}