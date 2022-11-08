export interface IData {
  data: IPost;
  id: string;
}
export interface IPost {
  title: string;
  body: string;
  userId: string;
}
export interface ILoginFormValues {
  login: string;
  password: string;
}
export interface IUser {
  uid: string;
  email: string | null;
}