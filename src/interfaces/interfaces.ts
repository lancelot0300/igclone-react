
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

export interface IPostsResponse {
  desc: string;
  user?: IUser;
  photo: string;
  likes: string[];
  comments: IComment[];
  _id: string;
}

export interface IResponse {
  posts: IPostsResponse[];
  pages: number;
  page: number;
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
  posts?: IPostsResponse[];
  user?: IUser
}