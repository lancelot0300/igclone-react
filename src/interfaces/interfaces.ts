export interface IData {
  data: IPostResponse[];
  id: string;
}

export interface IComment {
  _id: string;
  text: string;
  user: string;
  userName: string;
  userPhoto: string;
  createdAt: string;
}

export interface IPostResponse {
  desc: string;
  userId: string;
  photo: string;
  likes?: ILike[];
  comments?: IComment[];
  _id: string;
}

export interface IPost {
  desc: string;
  userId: string;
  photo: string;
}

export interface ILike {
  userId: string;
}

export interface IUser {
  photoURL: string;
  displayName?: string | null;
  _id: string;
  email: string | null;
}