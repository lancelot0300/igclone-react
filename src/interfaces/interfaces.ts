
export interface IComment {
  _id: string;
  comment: string;
  user?: {
    _id: string;
    displayName?: string;
    photoURL: string;
    email: string;
  };
}

export interface IPostResponse {
  desc: string;
  user?: IUser;
  photo: string;
  likes: string[];
  comments: IComment[];
  _id: string;
}

export interface IPost {
  desc: string;
  photo: string;
}

export interface IUser {
  photoURL?: string;
  displayName?: string | null;
  _id: string;
  email: string;
}

export interface ILikes {
  _id?: string;
}

export interface IProfile {
  posts?: IPostResponse[];
  user?: IUser
}