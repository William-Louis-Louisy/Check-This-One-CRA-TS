import { IContent } from "./Content";

interface ILikedBy {
  avatar: string;
  id: number;
  user_name: string;
}

export interface IList {
  id: number;
  title: string;
  description: string;
  creation_date: string;
  creator_id: number;
  likes: number;
  privacy: any;
  type: string;
  content: IContent[];
  tags?: any;
  liked_by: ILikedBy[];
  qrCodeDataURL?: string;
}

export interface ICreator {
  avatar: string;
  catchline: string;
  city: string;
  country: string;
  email: string;
  introduction: string;
  user_name: string;
  seenContent: any;
  seenContentCount: number;
}
