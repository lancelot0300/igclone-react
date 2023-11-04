
export interface IComment {
  _id: string;
  text: string;
  userID: string;
}

export interface IPostResponse {
  desc: string;
  userID: string;
  photo: string;
  likes: string[];
  comments: IComment[];
  _id: string;
}

export interface IPost {
  desc: string;
  userId: string;
  photo: string;
}

export interface IUser {
  photoURL?: string;
  displayName?: string | null;
  _id: string;
  email: string;
}

export interface IProfile {
  posts: IPostResponse[];
  user: IUser
}